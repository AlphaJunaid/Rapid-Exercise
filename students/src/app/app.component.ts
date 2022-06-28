import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CellClickEvent, GridComponent, GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor } from "@progress/kendo-data-query";
import { Observable, Subscription } from "rxjs";
import { ApiService } from './api.service';
import { FileUploadService } from './file-upload.service';
import { Button } from '@progress/kendo-angular-buttons';
import { parseDate } from '@progress/kendo-intl';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'students';
  data: any;
  loading = false;
  link: string = "";
  fileLoading: boolean = false; // Flag 
  uploadFlag: boolean = false; // Flag
  file!: File; // stores file  
  public gridData: any[] = [];
  age: number = 0;
  formFlag: boolean = false;
  public formGroup: FormGroup | undefined;
  form = this.formBuilder.group({
    name:'',
    year:'',
    month:'',
    day:'',
    email:'',
  });    
  updateStudId: any;
  addFlag: boolean = false;
  updateFlag: boolean = false;

  constructor(private fileUploadService: FileUploadService, private apiService: ApiService, private formBuilder: FormBuilder, private socketService: WebSocketService) {}

  async ngOnInit(){
    this.socketService.connect();
    (await this.apiService.getStudents()).subscribe(({data, loading} : any) => {
      this.loadGrid(data.findAll);
    });
    this.form.disable();
    this.socketService.listen();
  }

  async ngOnDestroy(){
    // this.docClickSubscription.unsubscribe();
  }

  loadGrid(data: any){
    let arr: any[] = [];
    data.forEach((element: any) => {
      // console.log(element);
      let obj : any = {};
      var timeDiff = Math.abs(Date.now() - new Date(element.dob).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
      element.dob = parseDate(element.dob);
      const yyyy = element.dob.getFullYear();
      let mm = element.dob.getMonth() + 1; // Months start at 0!
      let dd = element.dob.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      element.dob = dd + '/' + mm + '/' + yyyy;
      obj = {
        "Name":element.name,
        "DateOfBirth":element.dob,
        "Email":element.email,
        "Age":this.age,
        "Selected":false,
        "id":element.id
      };
      // console.log(obj);
      arr.push(obj);
    });
    this.gridData = arr;
    return;
  }

  // on file select
  onChange(event: any){
    this.file = event.target.files[0];
  }

  onAdd(){
    this.formFlag = true;
    this.addFlag = true;
    this.form.enable();
  }

  onUpdate(item: any){
    console.log(item);
    let y,m,d: string;
    [d,m,y] = this.getDMY(item.DateOfBirth);
    this.form.enable();
    this.updateStudId = item.id;
    this.form.patchValue({
      name: item.Name,
      year: y,
      month: m,
      day: d,
      email: item.Email,
    });
    this.formFlag = true;
    this.updateFlag = true;
  }

  getDMY(dateStr: string): string[]{
    let y,m,d;
    const ymdArr = dateStr.split('/');
    d = ymdArr[0];
    m = ymdArr[1];
    y = ymdArr[2];
    return [d,m,y]
  }

  async onConfirm(): Promise<void> {

    if(this.formFlag && this.updateFlag){
      (await this.apiService.updateStudent(this.updateStudId, this.form.value.name!, this.form.value.year!+'-'+this.form.value.month!+'-'+this.form.value.day!, this.form.value.email!)).subscribe(async ({data, loading} : any) => {
        (await this.apiService.getStudents()).subscribe(({data, loading} : any) => {
          this.loadGrid(data.findAll);
        });
      });
      this.form.reset();
      this.form.disable();
      this.formFlag = false;
      this.updateFlag = false;
    } else if (this.formFlag && this.addFlag) {
      (await this.apiService.addStudent(this.form.value.name!, this.form.value.year!+'-'+this.form.value.month!+'-'+this.form.value.day!, this.form.value.email!)).subscribe(async ({data, loading} : any) => {
        (await this.apiService.getStudents()).subscribe(({data, loading} : any) => {
          this.loadGrid(data.findAll);
        });
      });
      this.form.reset();
      this.form.disable();
      this.formFlag = false;
      this.addFlag = false;
    } 
    
  }

  async onDelete(item: any){
    console.log(item);
    (await this.apiService.deleteStudent(item.id)).subscribe(async ({data, loading} : any) => {
      (await this.apiService.getStudents()).subscribe(({data, loading} : any) => {
        this.loadGrid(data.findAll);
      });
    });

    return;
  }

  // async populateGrid(){
  //   // client = this.gqls.
  //   this.data = (await this.apiService.getStudents()).subscribe(({data, loading}) => {
  //     console.log(data);
  //   });
  // }
  
  async onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    let formData = new FormData();
    formData.append("file", this.file, this.file.name);
    try {
      await this.apiService.uploadFile(formData);
      // this.populateGrid();
      // this.notifServ.sendNotif('Hello')
    } catch (error) {
      
    }
    
    

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
