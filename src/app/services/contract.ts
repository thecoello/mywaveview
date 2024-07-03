import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Contract from '../models/contract';

@Injectable()
export class ContractService {
  
  private url:string = "http://127.0.0.1:8000"
  constructor(private http: HttpClient) { }

  createContract(body: FormData):Observable<Contract>{
    return this.http.post(`${this.url}/contract`,body)
  }

  getContracts(url: string):Observable<any>{
    return this.http.get( `${url}`)
  }

  getContract(id: string){
    return this.http.get(`${this.url}/contract/${id}`)
  }

  getPoints(url: string):Observable<any>{
    return this.http.get( `${url}`)
  }

  updateContract(id: string, body: Contract){
    return this.http.put(`${this.url}/contract/${id}`,body)
  }

  deleteContract(id: string){
    return this.http.delete(`${this.url}/contract/${id}`)
  }

}