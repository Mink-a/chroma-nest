import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { v4 as uuidv4 } from 'uuid';
import { AddData } from './app.interface';

@Injectable()
export class AppService {
  constructor(private dbService: DatabaseService) {}
  getHello(): string {
    return 'Hello World!';
  }

  heartbeatFn() {
    return this.dbService.heartbeat();
  }

  async add(data: AddData) {
    const collection = await this.dbService.getOrCreateCollection('test');
    const result = await collection.add({
      ids: [uuidv4()],
      documents: [data.text],
      metadatas: [
        {
          title: data.title,
          text: data.text,
        },
      ],
    });

    if (!result) {
      throw new Error('Failed to add document');
    }
    return { message: 'Document added.', data };
  }

  async search(query: string) {
    const collection = await this.dbService.getOrCreateCollection('test');
    return collection.query({
      nResults: 3,
      queryTexts: query,
    });
  }
}
