import { registerAs } from '@nestjs/config';

const config = registerAs('turso', () => ({
  databaseUrl: process.env.TURSO_URL,
  authToken: process.env.TURSO_TOKEN,
}));

export default config;

export type TursoConfig = ReturnType<typeof config>;
