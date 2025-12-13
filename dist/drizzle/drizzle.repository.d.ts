import type { Table, InferInsertModel, InferSelectModel, SQL } from 'drizzle-orm';
import type { DrizzleDatabaseType, DrizzleDatabase, DrizzleInsert, DrizzleUpdate, DrizzleSelectResult, InferValueType } from './interfaces';
export declare class DrizzleRepository<TSchema extends Record<string, Table>, TTable extends keyof TSchema, TType extends DrizzleDatabaseType, TEntity extends Table = TSchema[TTable]> {
    private readonly _client;
    private readonly entity;
    constructor(_client: DrizzleDatabase<TType, TSchema>, entity: TEntity);
    get client(): DrizzleDatabase<TType, TSchema>;
    select(): DrizzleSelectResult<TType, TTable & string, InferSelectModel<TEntity>>;
    select<TSelect extends Record<string, unknown>>(select: TSelect): DrizzleSelectResult<TType, TTable & string, {
        [K in keyof TSelect]: TSelect[K] extends SQL<infer U> ? U : InferValueType<TSelect[K]>;
    }>;
    selectWhere(where: SQL<unknown>): DrizzleSelectResult<TType, TTable & string, InferSelectModel<TEntity>>;
    selectWhere<TSelect extends Record<string, unknown>>(where: SQL<unknown>, select: TSelect): DrizzleSelectResult<TType, TTable & string, {
        [K in keyof TSelect]: TSelect[K] extends SQL<infer U> ? U : InferValueType<TSelect[K]>;
    }>;
    insert<TInsert extends InferInsertModel<TEntity>>(values: TInsert): DrizzleInsert<TType, TEntity, TInsert>;
    insert<TInsert extends InferInsertModel<TEntity>>(values: TInsert[]): DrizzleInsert<TType, TEntity, TInsert[]>;
    update<TUpdate extends Partial<InferInsertModel<TEntity>>>(values: TUpdate): DrizzleUpdate<TType, TEntity, TUpdate>;
    updateWhere<TUpdate extends Partial<InferInsertModel<TEntity>>>(where: SQL<unknown>, values: TUpdate): DrizzleUpdate<TType, TEntity, TUpdate>;
    delete(): ReturnType<typeof this._client.delete>;
    deleteWhere(where: SQL<unknown>): ReturnType<typeof this._client.delete>;
}
