<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A module for using drizzle-orm in NestJS

## Project setup

```bash
$ npm i @sixaphone/nestjs-drizzle
```

## Register connections

```ts
import { Module } from '@nestjs/common';
import { DrizzleModule } from '@sixaphone/nestjs-drizzle';
import { schema } from './database/schema';
import tursoConfig, { TursoConfig } from './config/turso.config';
import { DBS } from './constants';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // local with custom name
    DrizzleModule.forRoot({
      type: 'sqlite',
      name: DBS.LOCAL,
      url: 'file:project.db',
      schema,
    }),
    // local with default name
    DrizzleModule.forRoot({
      type: 'sqlite',
      url: 'file:defaukt_db.db',
      schema,
    }),
    // remote turso with custom name
    DrizzleModule.forRootAsync({
      name: DBS.TURSO,
      useFactory: (tursoConfig: TursoConfig) => {
        return {
          type: 'sqlite',
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
```

## Add Entities for feature

```ts
@Module({
  imports: [
    // for local named
    DrizzleModule.forFeature({
      entities: [users],
      name: DBS.LOCAL,
    }),
    // for local default
    DrizzleModule.forFeature({
      entities: [users],
    }),
    // for remote named
    DrizzleModule.forFeature({
      entities: [users],
      name: DBS.TURSO,
    }),
  ],
  providers: [MyService],
  controllers: [MyController],
})
export class MyModule {}
```

## Usage

You can choose to either use the client or a entity repository. Using the client will give full access to the underlying drizzle client connection, while the repository will limit the functionality.


### Using Client

```ts
import { Injectable } from '@nestjs/common';
import { DrizzleDatabase, InjectClient } from '@sixaphone/nestjs-drizzle';

@Injectable()
export class UserService {
  constructor(
    // inject the name here or leave empty for default
    @InjectClient('local')
    private readonly drizzleLocal: DrizzleDatabase<'sqlite', Schema>,
  ) {}

  public async createUser(name: string) {
    const user = await this.drizzleLocal.transaction((tx) => {
      return tx
        .insert(urls)
        .values({
          name,
        })
        .returning();
    });

    return user;
  }
}
```


### Using repository

```ts
import { Injectable } from '@nestjs/common';
import { DrizzleRepository, InjectRepository } from '@sixaphone/nestjs-drizzle';
import { eq } from 'drizzle-orm';
import { users } from 'src/database/user.entity';

@Injectable()
export class UserService {
  constructor(
    // inject the name here or leave empty for default
    @InjectRepository(users, 'local')
    private readonly userRepository: DrizzleRepository<
      Schema,
      'users',
      'sqlite'
    >,
  ) {}

  public async createUser(name: string) {
    const [user] = await this.userRepository.insert({
      name
    });

    return user;
  }

  public async getByName(name: string) {
    // select user by name and only take name field 
    // select name from users where name = $1
    const [user] = await this.userRepository.selectWhere(eq(users.name, name), {name: users.name});

    // or
    const [user] = await this.userRepository.select({name: users.name}).where(eq(users.name, name));

    return user;
  }
}
```

## Example

Check out the example url-redirect app in [`example/ directory`](./example/)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
