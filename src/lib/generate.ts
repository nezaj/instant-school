/*
  * Helper functions to generate random data for our app
  * */

import { id } from '@instantdb/admin';
import { randomQuestion, randomAnswer } from '@/data/questions';

type Role = 'admin' | 'teacher' | 'student';

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  created_at: number;
}

interface Task {
  id: string;
  question: string;
  created_at: number;
}

interface InstanceTask {
  id: string;
  question: string;
  answer?: string;
  assigned_at: number;
  completed_at?: number;
}

function generateEmail(): string {
  const adjectives: string[] = ['happy', 'sunny', 'playful', 'clever', 'brave', 'curious', 'kind', 'gentle', 'funny', 'lively'];
  const nouns: string[] = ['cat', 'dog', 'rabbit', 'elephant', 'tiger', 'lion', 'penguin', 'giraffe', 'zebra', 'monkey'];

  const randomAdjective: string = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun: string = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber: string = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return `${randomAdjective}.${randomNoun}.${randomNumber}@example.com`;
}

function generateFullName(): string {
  const firstNames: string[] = ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Joseph', 'Charles', 'Thomas', 'Daniel'];
  const lastNames: string[] = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

  const randomFirstName: string = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName: string = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

function randomRole(): Role {
  const roles: Role[] = ['admin', 'teacher', 'student'];
  return roles[Math.floor(Math.random() * roles.length)];
}

// ---------------------------
// Exported functions

export function generateUser(): User {
  return {
    id: id(),
    email: generateEmail(),
    name: generateFullName(),
    role: randomRole(),
    created_at: Date.now(),
  };
}

export function generateTask(): Task {
  return {
    id: id(),
    question: randomQuestion(),
    created_at: Date.now(),
  };
}

export function generateInstanceTask(): InstanceTask {
  const isCompleted: boolean = Math.random() > 0.5;
  const question: string = randomQuestion();
  return {
    id: id(),
    question,
    answer: isCompleted ? randomAnswer(question) : undefined,
    assigned_at: Date.now(),
    completed_at: isCompleted ? Date.now() : undefined,
  };
}
