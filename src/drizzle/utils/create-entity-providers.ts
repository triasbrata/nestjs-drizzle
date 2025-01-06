import { Table } from 'drizzle-orm';
import { Provider } from '@nestjs/common';
import { DrizzleDatabase } from '../interfaces';
import { DrizzleRepository } from '../drizzle.repository';
import { getClientToken } from './get-client-token';
import { getEntityToken } from './get-entity-token';

export const createEntityProviders = (entities: Table[], name: string) =>
  entities.map((entity): { provider: Provider; provide: string } => {
    const provide = getEntityToken(entity, name);

    return {
      provide,
      provider: {
        provide,
        useFactory: (
          drizzleClient: DrizzleDatabase<'sqlite', { [key: string]: Table }>,
        ) => {
          return new DrizzleRepository<{ [key: string]: Table }, '', 'sqlite'>(
            drizzleClient,
            entity,
          );
        },
        inject: [getClientToken(name)],
      },
    };
  });
