import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private dbService: DatabaseService) {}
  getHello(): string {
    return 'Hello World!';
  }

  heartbeatFn() {
    return this.dbService.heartbeat();
  }
}
