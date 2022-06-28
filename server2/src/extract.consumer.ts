import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import readXlsxFile from 'read-excel-file/node';
import { Job } from 'bull';
import { __Schema } from 'graphql';


@Processor('extract-queue')
export class ExtractConsumer {

  private qry; // query to insert
  private clearQry; // query to clear

  constructor() {}

  @Process('extract-job')
  readOperationJob(job: Job) {
    console.log(job.data.text);
    readXlsxFile(job.data.text)
      .then((rows) => {
        // console.log(rows);
        for (let index = 0; index < rows.length; index++) {
          const element = rows[index];
          console.log(element[1]);
          let d = new Date(element[1].toString());
          let month = (d.getMonth() + 1).toString();
          let day = d.getDate().toString();
          let year = d.getFullYear();
          if (month.length < 2) {
            month = '0' + month;
          }
          if (day.length < 2) {
            day = '0' + day;
          }
          console.log([year, month, day].join('-'));
          this.qry = `
            mutation {
            createStudent(
              createStudentInput: {
                name: "${element[0]}"
                email: "${element[2]}"
                dob: "${element[1]}"
              }
            ) {
              name
              email
              dob
              }
            }
            `;

          fetch('http://localhost:3000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              query: this.qry,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @OnQueueCompleted()
  sendNotif(){
    // implementation for sending http request to socket service (server) with 'upload success' message pending.
  }
}
