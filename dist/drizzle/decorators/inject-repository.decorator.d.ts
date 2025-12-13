import { Inject } from '@nestjs/common';
import { Table } from 'drizzle-orm';
export declare const InjectRepository: (entity: Table, connection?: string) => ReturnType<typeof Inject>;
