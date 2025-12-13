import type { DrizzleModuleOptions } from './interfaces';
export declare const ConfigurableDrizzleModule: import("@nestjs/common").ConfigurableModuleCls<DrizzleModuleOptions, "forRoot", "create", {
    isGlobal: boolean;
    name: string;
}>, DRIZZLE_OPTIONS_TOKEN: string | symbol, ASYNC_OPTIONS_TYPE: import("@nestjs/common").ConfigurableModuleAsyncOptions<DrizzleModuleOptions, "create"> & Partial<{
    isGlobal: boolean;
    name: string;
}>, OPTIONS_TYPE: {
    type: import("./interfaces").DrizzleDatabaseType;
    schema: Record<string, import("drizzle-orm").Table>;
} & import("@libsql/core/api").Config & Partial<{
    isGlobal: boolean;
    name: string;
}>;
