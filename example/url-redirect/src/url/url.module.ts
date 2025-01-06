import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DrizzleModule } from '@sixaphone/nestjs-drizzle';
import { urls } from 'src/database/url.entity';
import { DBS } from 'src/constants';

@Module({
  imports: [
    DrizzleModule.forFeature({
      entities: [urls],
      name: DBS.LOCAL,
    }),
    DrizzleModule.forFeature({
      entities: [urls],
      name: DBS.TURSO,
    }),
  ],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}
