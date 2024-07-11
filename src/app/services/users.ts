import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../models/user';
import { Observable } from 'rxjs';
import Login from '../models/login';

@Injectable()
export class UserService {
  
  private url:string = "http://127.0.0.1:8000/api"
  headers:any = {
    'Authorization' : localStorage.getItem('token'),
    'Accept' : 'application/json',
    'user_id' : localStorage.getItem('user_id')
  }
  constructor(private http: HttpClient) { }

  createUser(body: User):Observable<User>{
    let header = {'Content-Type': 'application/json'}
    return this.http.post(`${this.url}/user`,body,{headers: header})
  }

  getUsers(url: string):Observable<any>{
    return this.http.get(`${url}`,{headers: this.headers})
  }

  getUser(id: string){
    return this.http.get(`${this.url}/user/${id}`,{headers: this.headers})
  }

  updateUser(id: string, body: User){
    return this.http.put(`${this.url}/user/${id}`,body,{headers: this.headers})
  }

  deleteUser(id: string){
    return this.http.delete(`${this.url}/user/${id}`,{headers: this.headers})
  }

  login(body: Login):Observable<any>{
    let header = {'Content-Type': 'application/json'}
    return this.http.post(`${this.url}/login`,body,{headers: header})
  }

  passwordRecover(email: string):Observable<any>{
    return this.http.post(`${this.url}/login`,email,)
  }

  logout(){
    return this.http.get(`${this.url}/logout`,{headers: this.headers})
  }
}