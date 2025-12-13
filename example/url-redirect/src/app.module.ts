import { Module } from '@nestjs/common';
import { DrizzleModule } from '@sixaphone/nestjs-drizzle';
import { schema } from './database/schema';
import tursoConfig, { TursoConfig } from './config/turso.config';
import { DBS } from './constants';
import { ConfigModule } from '@nestjs/config';
import { UrlModule } from './url/url.module';

@Module({
  imports: [
    DrizzleModule.forRoot({
      type: 'postgres',
      name: DBS.LOCAL,
      url: 'lite:url.db1',
      schema,
    }),
    DrizzleModule.forRootAsync({
      name: DBS.TURSO,
      useFactory: (tursoConfig: TursoConfig) => {
        return {
          type: 'postgres',
          url: tursoConfig.databaseUrl!,
          authToken: tursoConfig.authToken!,
          schema,
        };
      },
      imports: [ConfigModule.forFeature(tursoConfig)],
      inject: [tursoConfig.KEY],
    }),
    ConfigModule.forRoot({}),
    UrlModule,
  ],
})
export class AppModule {}
