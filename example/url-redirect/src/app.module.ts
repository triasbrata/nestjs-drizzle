import { Module } from '@nestjs/common';
import { DrizzleModule } from '../../../dist';
import { schema } from './database/schema';
import tursoConfig, { TursoConfig } from './config/turso.config';
import { DBS } from './constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule.forRoot({
      type: 'sqlite',
      name: DBS.LOCAL,
      url: 'file:url.db',
      schema,
    }),
    DrizzleModule.forRootAsync({
      useFactory: (tursoConfig: TursoConfig) => {
        return {
          type: 'sqlite',
          name: DBS.TURSO,
          url: tursoConfig.databaseUrl!,
          authToken: tursoConfig.authToken!,
          schema,
        };
      },
      imports: [ConfigModule.forFeature(tursoConfig)],
      inject: [tursoConfig.KEY],
    }),
    ConfigModule.forRoot({}),
  ],
})
export class AppModule {}
