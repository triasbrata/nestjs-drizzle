import { Table } from 'drizzle-orm';

export const getEntityName = (entity: Table): string => {
  return entity[Symbol.for('drizzle:Name')];
};

export const getEntityToken = (entity: Table, connection: string) => {
  return `drizzle_entity:${connection}:${getEntityName(entity)}`;
};
