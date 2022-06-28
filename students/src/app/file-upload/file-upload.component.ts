import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  link: string = "";
  loading: boolean = false; // Flag 
  file!: File; // stores file  
  dataSource = [];

  constructor(private fileUploadService: FileUploadService, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  // on file select
  onChange(event: any){
    this.file = event.target.files[0];
  }

  // onclick of button upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);
    this.apiService.uploadFile(formData);
    

    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
  
          //link via api response
          this.link = event.link;

          this.loading = false; // Flag variable
      }
      }
    );
  }

}
