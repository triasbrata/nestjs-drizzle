import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import type { PgliteDatabase } from 'drizzle-orm/pglite';
import type { Config } from '@libsql/client';
import type {
  AnyColumn,
  AnyTable,
  ColumnsSelection,
  Placeholder,
  SQL,
  Table,
} from 'drizzle-orm';
import type {
  AnySQLiteTable,
  SQLiteInsertBuilder,
  SQLiteSelect,
  SQLiteUpdateBuilder,
  SQLiteUpdateSetSource,
} from 'drizzle-orm/sqlite-core';
import type {
  AnyPgTable,
  PgDatabase,
  PgInsertBuilder,
  PgQueryResultHKT,
  PgSelect,
  PgUpdateBuilder,
  PgUpdateSetSource,
} from 'drizzle-orm/pg-core';
import type {
  AnyMySqlTable,
  MySqlInsertBuilder,
  MySqlQueryResultHKT,
  MySqlSelect,
  MySqlTable,
  MySqlUpdateBuilder,
  MySqlUpdateSetSource,
  PreparedQueryHKTBase,
} from 'drizzle-orm/mysql-core';

export type DrizzleDatabaseType =
  | 'sqlite'
  | 'better-sqlite3'
  | 'postgres'
  | 'mysql';

// map db type -> schema type
type SchemaFor<TType extends DrizzleDatabaseType> = Record<
  string,
  TableFor<TType>
>;
export type TableFor<TType extends DrizzleDatabaseType> = TType extends
  | 'sqlite'
  | 'better-sqlite3'
  ? AnySQLiteTable
  : TType extends 'postgres'
    ? AnyPgTable
    : TType extends 'mysql'
      ? AnyMySqlTable
      : unknown;

export type DrizzleModuleOptions<
  TType extends DrizzleDatabaseType = DrizzleDatabaseType,
> = {
  type: TType;
  schema: SchemaFor<TType>;
} & Config;

export type DrizzleDatabase<TType extends DrizzleDatabaseType> =
  TType extends 'sqlite'
    ? LibSQLDatabase<SchemaFor<TType>>
    : TType extends 'better-sqlite3'
      ? BetterSQLite3Database<SchemaFor<TType>>
      : TType extends 'postgres'
        ? // postgres = node-postgres OR pglite
            NodePgDatabase<SchemaFor<TType>> | PgliteDatabase<SchemaFor<TType>>
        : TType extends 'mysql'
          ? MySql2Database<SchemaFor<TType>>
          : never;

export type InferInsertValue<T> = {
  [K in keyof T]: SQL<unknown> | Placeholder<string, any> | T[K];
};

export type InferValueType<T> =
  T extends AnyColumn<infer U> ? U['data'] : T extends SQL<infer V> ? V : T;

// Use PgDatabase so both NodePgDatabase & PgliteDatabase are covered
export type DrizzleSelect<
  TDatabase extends
    | LibSQLDatabase<any>
    | BetterSQLite3Database<any>
    | PgDatabase<any>
    | MySql2Database<any>,
  TTable extends string,
  TSelect extends Record<string, unknown>,
> = TDatabase extends LibSQLDatabase<any> | BetterSQLite3Database<any>
  ? SQLiteSelect<TTable, 'async', TSelect>
  : TDatabase extends PgDatabase<any>
    ? PgSelect<TTable, TSelect>
    : TDatabase extends MySql2Database<any>
      ? MySqlSelect<TTable, TSelect>
      : never;

export type DrizzleSelectResult<
  TType extends DrizzleDatabaseType,
  TTable extends string,
  TSelect,
> = TType extends 'sqlite' | 'better-sqlite3'
  ? SQLiteSelect<TTable, 'async', TSelect> & Promise<TSelect[]>
  : TType extends 'postgres'
    ? PgSelect<TTable, TSelect & ColumnsSelection> & Promise<TSelect[]>
    : TType extends 'mysql'
      ? MySqlSelect<TTable, TSelect & ColumnsSelection> & Promise<TSelect[]>
      : never;

export type DrizzleInsert<
  TType extends DrizzleDatabaseType,
  TInsert,
> = TType extends 'sqlite' | 'better-sqlite3'
  ? ReturnType<
      SQLiteInsertBuilder<
        TableFor<TType>,
        TInsert extends any[] ? 'async' : 'sync',
        any
      >['values']
    >
  : TType extends 'postgres'
    ? ReturnType<
        PgInsertBuilder<TableFor<TType>, TInsert & PgQueryResultHKT>['values']
      >
    : TType extends 'mysql'
      ? ReturnType<
          MySqlInsertBuilder<
            TableFor<TType>,
            TInsert & MySqlQueryResultHKT,
            PreparedQueryHKTBase
          >['values']
        >
      : never;

export type DrizzleUpdate<
  TType extends DrizzleDatabaseType,
  TUpdate extends
    | SQLiteUpdateSetSource<TableFor<'sqlite' | 'better-sqlite3'>>
    | PgUpdateSetSource<TableFor<'postgres'>>
    | MySqlUpdateSetSource<TableFor<'mysql'>>,
> = TType extends 'sqlite' | 'better-sqlite3'
  ? ReturnType<SQLiteUpdateBuilder<TableFor<TType>, 'async', TUpdate>['set']>
  : TType extends 'postgres'
    ? ReturnType<
        PgUpdateBuilder<TableFor<TType>, TUpdate & PgQueryResultHKT>['set']
      >
    : TType extends 'mysql'
      ? ReturnType<
          MySqlUpdateBuilder<
            TableFor<'mysql'>,
            TUpdate & MySqlQueryResultHKT,
            PreparedQueryHKTBase
          >['set']
        >
      : never;
