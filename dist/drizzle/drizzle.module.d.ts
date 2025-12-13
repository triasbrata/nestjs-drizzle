import { Table } from 'drizzle-orm';
import { DynamicModule } from '@nestjs/common';
import { ConfigurableDrizzleModule, ASYNC_OPTIONS_TYPE, OPTIONS_TYPE } from './drizzle.module-definitions';
export declare class DrizzleModule extends ConfigurableDrizzleModule {
    static forRoot(options: typeof OPTIONS_TYPE): {
        providers: (import("@nestjs/common").Provider | {
            provide: string;
            useFactory: (options: import("./interfaces").DrizzleModuleOptions) => import("./interfaces").DrizzleDatabase<typeof options.type>;
            inject: (string | symbol)[];
        })[];
        exports: (string | symbol | Function | import("@nestjs/common").ForwardReference<any> | DynamicModule | import("@nestjs/common").ClassProvider<any> | import("@nestjs/common").ValueProvider<any> | import("@nestjs/common").FactoryProvider<any> | import("@nestjs/common").ExistingProvider<any>)[];
        module: import("@nestjs/common").Type<any>;
        global?: boolean;
        imports?: Array<import("@nestjs/common").Type<any> | DynamicModule | Promise<DynamicModule> | import("@nestjs/common").ForwardReference>;
        controllers?: import("@nestjs/common").Type<any>[];
    };
    static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule;
    static forFeature({ entities, name }: {
        entities: Table[];
        name?: string;
    }): {
        module: typeof DrizzleModule;
        providers: import("@nestjs/common").Provider[];
        exports: string[];
    };
}
