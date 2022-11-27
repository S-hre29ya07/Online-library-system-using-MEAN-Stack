import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { catchError,map } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // node.js API
  REST_API:string="http://localhost:8000/api";
  // ṣet header
  httpHeaders = new HttpHeaders().set('Content-Type','application/json')

  constructor(private httpClient:HttpClient) { }
  // add recorders
  AddBook(data:Book):Observable<any>{
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL,data).pipe(catchError(this.handleError))
  }
  // get all records
  getBooks(){
    return this.httpClient.get(`${this.REST_API}`);
  }

  // get single book
  getBook(id:any) :Observable<any>{
    let API_URL=`${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL,{headers:this.httpHeaders}).pipe(map((res:any)=>{
      return res || {}
    }),
    catchError(this.handleError)
    )
  }

  // update Book Data
  updateBook(id:any, data:any):Observable<any>{
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL,data,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }

  // Delete Book data
  deleteBook(id:any):Observable<any>{
    let API_URL=`${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(
      catchError(this.handleError)
    )
  }
  // Error
  handleError(error:HttpErrorResponse){
    let errorMessage ='';
    if(error.error instanceof ErrorEvent){
      // handle client error
      errorMessage= error.error.message;
    }else{
      // Handle server error
      errorMessage=`Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
