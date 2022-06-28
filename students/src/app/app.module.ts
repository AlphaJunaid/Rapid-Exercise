import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { GraphQLModule } from './graphql.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = {
  url: environment.socketUrl,
  options: {
    transports: ['websocket']
  } 
}

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ApolloModule,
    // ButtonsModule,
    // InputsModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
  ],
bootstrap: [AppComponent]
})
export class AppModule { }
