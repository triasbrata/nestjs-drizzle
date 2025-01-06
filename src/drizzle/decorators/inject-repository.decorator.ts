import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
import { getEntityToken } from '../utils/get-entity-token';
import { DEFAULT_CLIENT_TOKEN } from '../drizzle.constants';

export const InjectRepository = (
  entity: Table,
  connection: string = DEFAULT_CLIENT_TOKEN,
): ReturnType<typeof Inject> => Inject(getEntityToken(entity, connection));
