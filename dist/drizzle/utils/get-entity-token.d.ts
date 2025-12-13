import { Table } from 'drizzle-orm';
export declare const getEntityName: (entity: Table) => string;
export declare const getEntityToken: (entity: Table, connection: string) => string;
