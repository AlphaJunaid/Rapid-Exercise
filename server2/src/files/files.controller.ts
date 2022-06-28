import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExtractProducerService } from 'src/extract.producer.service';

@Controller('files')
export class FilesController {
  private clearQry; // query to clear
  constructor(
    private readonly extractProducerService: ExtractProducerService,
  ) {}
  @Get('test')
  getDemo() {
    return 'Test';
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: `C:/Users/JunaidA/Desktop/Projects/backend_server/uploads/`,
    }),
  )
  async uploadfile(@UploadedFile() file) {
    console.log(file);
    this.clearQry = `
          mutation{
            clearAll(table:"student")
          }
          `;

    await fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: this.clearQry,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    this.extractProducerService.sendPath(`${file.destination}${file.filename}`);
  }
}
