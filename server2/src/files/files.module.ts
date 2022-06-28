import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ExtractConsumer } from 'src/extract.consumer';
import { ExtractProducerService } from 'src/extract.producer.service';
import { FilesController } from './files.controller';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue({
      name: 'extract-queue',
    }),
    // SocketIoClientModule.forRoot('ws://localhost:8000'),
  ],
  controllers: [FilesController],
  providers: [ExtractProducerService, ExtractConsumer],
})
export class FilesModule {
}