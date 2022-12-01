declare global {
  namespace NodeJS {
    interface ProcessEnv {
      KEY_SECRET_JWT: string;
    }
  }
}

export {};
