import type { DrizzleModuleOptions, DrizzleDatabase } from '../interfaces';
export declare const createProviders: (name?: string) => {
    provide: string;
    useFactory: (options: DrizzleModuleOptions) => DrizzleDatabase<typeof options.type>;
    inject: (string | symbol)[];
}[];
