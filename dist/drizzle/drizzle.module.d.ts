import { DynamicModule } from '@nestjs/common';
import { ConfigurableDrizzleModule, ASYNC_OPTIONS_TYPE, OPTIONS_TYPE } from './drizzle.module-definitions';
import { DrizzleDatabaseType, TableFor } from './interfaces';
export declare class DrizzleModule extends ConfigurableDrizzleModule {
    static forRoot(options: typeof OPTIONS_TYPE): {
        providers: (import("@nestjs/common").Provider | {
            provide: string;
            useFactory: (options: import("./interfaces").DrizzleModuleOptions) => import("./interfaces").DrizzleDatabase<typeof options.type>;
            inject: (string | symbol)[];
        })[];
        exports: (string | symbol | Function | DynamicModule | import("@nestjs/common").ForwardReference<any> | import("@nestjs/common").ClassProvider<any> | import("@nestjs/common").ValueProvider<any> | import("@nestjs/common").FactoryProvider<any> | import("@nestjs/common").ExistingProvider<any>)[];
        module: import("@nestjs/common").Type<any>;
        global?: boolean;
        imports?: Array<import("@nestjs/common").Type<any> | DynamicModule | Promise<DynamicModule> | import("@nestjs/common").ForwardReference>;
        controllers?: import("@nestjs/common").Type<any>[];
    };
    static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule;
    static forFeature<TType extends DrizzleDatabaseType>({ entities, name, }: {
        entities: TableFor<TType>[];
        name?: string;
    }): {
        module: typeof DrizzleModule;
        providers: import("@nestjs/common").Provider[];
        exports: string[];
    };
}
