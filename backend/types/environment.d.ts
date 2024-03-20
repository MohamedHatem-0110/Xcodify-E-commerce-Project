export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPRESS_PORT: number;
      DATABASE_HOST: string;
      JSON_TOKEN_SECRET: string;
      NODE_ENV: 'test' | 'development' | 'production';
    }
  }
}
