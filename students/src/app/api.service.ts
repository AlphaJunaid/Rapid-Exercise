import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Apollo, ApolloBase, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_SERVER = "http://localhost:3000";
  // uri = "http://localhost:3000/graphql"
  // private querySubscription: Subscription;

  constructor(private httpClient: HttpClient, private apollo: Apollo) {
    // this.apollo = this.apollo.use('Client')
   }

  public async uploadFile(data: FormData){
    return await this.httpClient.post(`${this.API_SERVER}/files/upload`, data).subscribe((response) => {
      console.log(response);
    });
  }

  public async addStudent (name: string, date: string, email: string) {
    console.log(name);
    return await this.apollo.query({
      query: gql`
      mutation {
        createStudent(
          createStudentInput: {
            name: "${name}"
            email: "${email}"
            dob: "${date}"
          }
        ) {
          name
          email
          dob
        }
      }`,
    })
  }

  public async deleteStudent (id: string) {
    console.log(id);
    return await this.apollo.query({
      query: gql`
      mutation{
        removeStudent(studId:"${id}"){
          id
        }  
      }`,
    })
  }

  public async getStudents () {
    return await this.apollo.query({
      query: gql`
        {findAll{
          name
          email
          dob
          id
        }}`,
    })

  }

  public async updateStudent (id: string, name: string, date: string, email: string) {
    console.log(id);
    return await this.apollo.query({
      query: gql`
      mutation {
        updateStudent(
          updateStudentInput: {
            id: "${id}"
            name: "${name}"
            dob: "${date}"
            email: "${email}"
          }
        ) {
          id,
          name
        }
      }`,
    })
  }

}
