import type { DrizzleModuleOptions } from './interfaces';
export declare const ConfigurableDrizzleModule: import("@nestjs/common").ConfigurableModuleCls<DrizzleModuleOptions, "forRoot", "create", {
    isGlobal: boolean;
    name: string;
}>, DRIZZLE_OPTIONS_TOKEN: string | symbol, ASYNC_OPTIONS_TYPE: import("@nestjs/common").ConfigurableModuleAsyncOptions<DrizzleModuleOptions, "create"> & Partial<{
    isGlobal: boolean;
    name: string;
}>, OPTIONS_TYPE: {
    type: import("./interfaces").DrizzleDatabaseType;
    schema: {
        [x: string]: import("drizzle-orm/sqlite-core").AnySQLiteTable | import("drizzle-orm/pg-core").AnyPgTable | import("drizzle-orm/mysql-core").AnyMySqlTable;
    };
} & import("@libsql/client/.").Config & Partial<{
    isGlobal: boolean;
    name: string;
}>;
