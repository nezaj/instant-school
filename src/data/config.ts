import dotenv from "dotenv";
import { Config } from "@instantdb/react"
import { Config as AdminConfig } from "@instantdb/admin";

dotenv.config();

// ---------------------------
// Change this to your app ID!
const APP_ID = "a82d1720-3963-4eb7-9cc7-e67880cb2def"
// ---------------------------

interface Env {
  apiURI: string; websocketURI: string;
}

interface BaseConfig extends Env { appId: string; }

const prod: Env = {
  apiURI: "https://api.instantdb.com",
  websocketURI: "wss://api.instantdb.com/runtime/session",
};

const dev: Env = {
  apiURI: "http://localhost:8888",
  websocketURI: "ws://localhost:8888/runtime/session"
};

function makeConfig(env: Env): BaseConfig {
  const { apiURI, websocketURI } = env;
  return { apiURI, websocketURI, appId: APP_ID };
}

const clientConfig = (() => {
  let env = dev;
  if (typeof window == 'undefined' || !localStorage.getItem('devBackend')) {
    env = prod;
  }
  return makeConfig(env)
})()


const adminConfig = (() => {
  let env = dev;
  if (!process.env.DEV) {
    env = prod;
  }
  return {
    ...makeConfig(env),
    adminToken: process.env.INSTANT_ADMIN_TOKEN
  };
})()


export { clientConfig, adminConfig };
