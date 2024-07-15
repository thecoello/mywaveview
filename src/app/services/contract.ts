import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Contract from '../models/contract';
import { environment } from '../../environments/environment';

@Injectable()
export class ContractService {
  
  private url:string = environment.apiUrl
  headers:any = {
    'Authorization' : localStorage.getItem('token'),
    'Accept' : 'application/json',
    'user_id' : localStorage.getItem('user_id')
  }
  constructor(private http: HttpClient) { }

  createContract(body: FormData):Observable<Contract>{
    return this.http.post(`${this.url}/contract`,body,{headers: this.headers})
  }

  getContracts(id: string):Observable<any>{
    return this.http.get( `${this.url}/contracts/${id}`,{headers: this.headers})
  }

  getContract(id: string){
    return this.http.get(`${this.url}/contract/${id}`,{headers: this.headers})
  }

  getPoints(url: string):Observable<any>{
    return this.http.get( `${url}`)
  }

  deleteContract(id: string){
    return this.http.delete(`${this.url}/contract/${id}`,{headers: this.headers})
  }

}