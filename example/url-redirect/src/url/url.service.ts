import { Injectable } from '@nestjs/common';
import {
  DrizzleDatabase,
  DrizzleRepository,
  InjectClient,
  InjectRepository,
} from '@sixaphone/nestjs-drizzle';
import { eq } from 'drizzle-orm';
import { DBS } from 'src/constants';
import { Schema } from 'src/database/schema';
import { urls } from 'src/database/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectClient(DBS.LOCAL)
    private readonly drizzleLocal: DrizzleDatabase<'postgres', Schema>,
    @InjectClient(DBS.TURSO)
    private readonly drizzleTurso: DrizzleDatabase<'postgres', Schema>,

    @InjectRepository(urls, DBS.LOCAL)
    private readonly urlLocalRepository: DrizzleRepository<
      Schema,
      'urls',
      'sqlite'
    >,

    @InjectRepository(urls, DBS.TURSO)
    private readonly urlTursoRepository: DrizzleRepository<
      Schema,
      'urls',
      'sqlite'
    >,
  ) {}

  public async getUrlBySlug(slug: string) {
    const [local] = await this.urlLocalRepository.selectWhere(
      eq(urls.slug, slug),
    );
    const [turso] = await this.urlTursoRepository.selectWhere(
      eq(urls.slug, slug),
    );

    console.log({ local, turso });

    return local || turso;
  }

  public async createUrl(url: string) {
    const local = await this.drizzleLocal.transaction((tx) => {
      return tx
        .insert(urls)
        .values({
          target: url,
          slug: new Date().getTime().toString(36),
        })
        .returning();
    });

    await this.drizzleTurso.transaction((tx) => {
      return tx
        .insert(urls)
        .values({
          target: url,
          slug: new Date().getTime().toString(36),
        })
        .returning();
    });

    return local;
  }
}
