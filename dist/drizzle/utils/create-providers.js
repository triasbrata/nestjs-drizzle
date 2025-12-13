"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProviders = void 0;
const libsql_1 = require("drizzle-orm/libsql");
const better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
const client_1 = require("@libsql/client");
const drizzle_module_definitions_1 = require("../drizzle.module-definitions");
const get_client_token_1 = require("./get-client-token");
const createProviders = (name) => [
    {
        provide: (0, get_client_token_1.getClientToken)(name),
        useFactory: (options) => {
            const { type, schema, ...connectionConfig } = options;
            switch (type) {
                case 'sqlite': {
                    const client = (0, client_1.createClient)(connectionConfig);
                    return (0, libsql_1.drizzle)(client, { schema });
                }
                case 'better-sqlite3': {
                    return (0, better_sqlite3_1.drizzle)(connectionConfig, {
                        schema,
                    });
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