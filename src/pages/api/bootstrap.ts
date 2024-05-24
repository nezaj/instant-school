/*
  * Endpoint for recreating the db
  * Usage: curl http://localhost:3000/api/bootstrap
  * */

import dotenv from 'dotenv';
import { id, init, tx } from "@instantdb/admin"

import { adminConfig } from '@/data/config';
import { fetchSchema, httpTransact } from '@/lib/http';
import { generateUser } from '@/lib/generate';
import { randomElement } from '@/utils/random';

dotenv.config();

interface Link {
  ref: string;
  forward: string;
  reverse: string;
}

interface Node {
  keys: string[];
  links?: Link[];
}

interface Schema {
  [key: string]: Node;
}

type Ident = string[];

interface BaseAttribute {
  id: string;
  "forward-identity": string[];
  "value-type": "blob" | "ref";
  cardinality: "one" | "many";
  "unique?": boolean;
  "index?": boolean;
}

interface ObjectAttribute extends BaseAttribute {
  "value-type": "blob";
  cardinality: "one";
}

interface RefAttribute extends BaseAttribute {
  "reverse-identity": string[];
  "value-type": "ref";
  cardinality: "many";
}


const schema: Schema = {
  users: {
    keys: ["email", "name", "role", "created_at"],
    links: [
      { ref: "users", forward: "students", reverse: "teachers" },
    ]
  },
  tasks: {
    keys: ["question", "created_at"],
    links: [
      { ref: "instance_tasks", forward: "instances", reverse: "master" },
      { ref: "users", forward: "created_by", reverse: "created_tasks" },
    ]
  },
  instance_tasks: {
    keys: ["question", "answer", "assigned_at", "completed_at"],
    links: [
      { ref: "users", forward: "assigned_by", reverse: "created_instance_tasks" },
      { ref: "users", forward: "assigned_to", reverse: "assigned_instance_tasks" },
    ]
  }
}

function createObjectAttr(fwdIdent: Ident): ObjectAttribute {
  return {
    id: id(),
    "forward-identity": [id(), ...fwdIdent],
    "value-type": "blob",
    cardinality: "one",
    "unique?": false,
    "index?": false,
  };
}

function createRefAttr(fwdIdent: Ident, revIdent: Ident): RefAttribute {
  return {
    id: id(),
    "forward-identity": [id(), ...fwdIdent],
    "reverse-identity": [id(), ...revIdent],
    "value-type": "ref",
    cardinality: "many",
    "unique?": false,
    "index?": false,
  };
}

async function recreate() {
  const attrsToAdd = Object.entries(schema).flatMap(([etype, { keys, links }]) => {
    const objectAttrs = (keys || []).map((key) => createObjectAttr([etype, key]));
    const refAttrs = (links || []).map(({ ref, forward, reverse }) => {
      return createRefAttr([etype, forward], [ref, reverse])
    });
    return [...objectAttrs, ...refAttrs];
  });

  const { attrs } = await fetchSchema();
  const deleteSteps = attrs.map(({ id }) => {
    return ["delete-attr", id];
  })
  const addSteps = attrsToAdd.map((attr) => {
    return ["add-attr", attr];
  });
  const txSteps = [...deleteSteps, ...addSteps];
  console.log(txSteps);
  const res = await httpTransact(txSteps);
  console.log(res);
}

const db = init(adminConfig);
const { transact } = db;

async function bootstrap() {
  const users = Array(15).fill(null).map(() => generateUser());
  const admins = users.filter(u => u.role === 'admin');
  const teachers = users.filter(u => u.role === 'teacher');
  const students = users.filter(u => u.role === 'student');
  const userTxs = users.map(u => tx.users[u.id].update(u));
  const associateStudents = students.map(
    (student) => {
      const teacher = randomElement(teachers);
      return tx.users[teacher.id].update({ students: student.id });
    }
  )
  await transact([...userTxs, ...associateStudents]);
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  try {
    await recreate();
    await bootstrap();
    res.status(200).json({ message: "Database re-created!" })
  } catch (error) {
    const message = "Error creating database:"
    console.error(message, error);
    res.status(500).json({ message, error });
  }
}
