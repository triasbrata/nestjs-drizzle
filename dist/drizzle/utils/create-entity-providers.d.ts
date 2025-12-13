import { Table } from 'drizzle-orm';
import { Provider } from '@nestjs/common';
export declare const createEntityProviders: (entities: Table[], name: string) => {
    provider: Provider;
    provide: string;
}[];
