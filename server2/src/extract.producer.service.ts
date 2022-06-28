import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
@Injectable()
export class ExtractProducerService {
  constructor(@InjectQueue('extract-queue') private queue: Queue) {}
 
  async sendPath(path: string) {
    console.log('sending');
    await this.queue.add('extract-job',{
      text: path,
    });

  }

  
}