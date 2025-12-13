import { drizzle as drizzleSqlite } from 'drizzle-orm/libsql';
import { drizzle as drizzleBetterSqlite3 } from 'drizzle-orm/better-sqlite3';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { createClient } from '@libsql/client';
import type { DrizzleModuleOptions, DrizzleDatabase } from '../interfaces';
import { DRIZZLE_OPTIONS_TOKEN } from '../drizzle.module-definitions';
import { getClientToken } from './get-client-token';
import { Pool } from 'pg';
import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePgLite } from 'drizzle-orm/pglite';

export const createProviders = (name?: string) => [
  {
    provide: getClientToken(name),
    useFactory: (
      options: DrizzleModuleOptions,
    ): DrizzleDatabase<typeof options.type, typeof options.schema> => {
      const { type, schema, ...connectionConfig } = options;

      switch (type) {
        case 'sqlite': {
          const client = createClient(connectionConfig);
          return drizzleSqlite(client, { schema }) as DrizzleDatabase<
            typeof options.type,
            typeof options.schema
          >;
        }
        case 'better-sqlite3': {
          return drizzleBetterSqlite3(connectionConfig, {
            schema,
          }) as DrizzleDatabase<typeof options.type, typeof options.schema>;
        }
        case 'postgres': {
          if (options.url.startsWith('lite:')) {
            const pool = new PGlite({});
            const client = drizzlePgLite({ client: pool }) as DrizzleDatabase<
              typeof options.type,
              typeof options.schema
            >;
            return client;
          }
          const pool = new Pool({
            connectionString: options.url,
          });
          const client = drizzlePg({ client: pool }) as DrizzleDatabase<
            typeof options.type,
            typeof options.schema
          >;
          return client;
        }
        default: {
          throw new Error(`Unsupported database type: ${type}`);
        }
      }
    },
    inject: [DRIZZLE_OPTIONS_TOKEN],
  },
];
