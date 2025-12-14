"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProviders = void 0;
const libsql_1 = require("drizzle-orm/libsql");
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const client_1 = require("@libsql/client");
const drizzle_module_definitions_1 = require("../drizzle.module-definitions");
const get_client_token_1 = require("./get-client-token");
const pg_1 = require("pg");
const pglite_1 = require("@electric-sql/pglite");
const pglite_2 = require("drizzle-orm/pglite");
const createProviders = (name) => [
    {
        provide: (0, get_client_token_1.getClientToken)(name),
        useFactory: (options) => {
            const { type, schema, ...connectionConfig } = options;
            switch (type) {
                case "sqlite": {
                    const client = (0, client_1.createClient)(connectionConfig);
                    return (0, libsql_1.drizzle)(client, { schema });
                }
                case "better-sqlite3": {
                    return (0, better_sqlite3_1.drizzle)(connectionConfig, {
                        schema,
                    });
                }
                case "postgres": {
                    if (options.url?.startsWith("pglite:")) {
                        const match = options.url.match(/^pglite:(.*)$/);
                        const dbOptions = {};
                        if (match) {
                            if (match[0]) {
                                dbOptions.dataDir = match[0];
                            }
                        }
                        const pool = new pglite_1.PGlite(dbOptions);
                        const client = (0, pglite_2.drizzle)({
                            client: pool,
                        });
                        return client;
                    }
                    const pool = new pg_1.Pool({
                        connectionString: options.url,
                    });
                    const client = (0, node_postgres_1.drizzle)({
                        client: pool,
                    });
                    return client;
                }
                default: {
                    throw new Error(`Unsupported database type: ${type}`);
                }
            }
        },
        inject: [drizzle_module_definitions_1.DRIZZLE_OPTIONS_TOKEN],
    },
];
exports.createProviders = createProviders;
//# sourceMappingURL=create-providers.js.map