import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  
  private url:string = "http://127.0.0.1:8000"
  constructor(private http: HttpClient) { }

  createUser(body: User):Observable<User>{
    let header = {'Content-Type': 'application/json'}
    return this.http.post(`${this.url}/user`,body,{headers: header})
  }

  getUsers(url: string):Observable<any>{
    return this.http.get(`${url}`)
  }

  getUser(id: string){
    return this.http.get(`${this.url}/user/${id}`)
  }

  updateUser(id: string, body: User){
    return this.http.put(`${this.url}/user/${id}`,body)
  }

  deleteUser(id: string){
    return this.http.delete(`${this.url}/user/${id}`)
  }

}