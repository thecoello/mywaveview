import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import AditionalPointsModel from '../models/aditioanpoints';
import { environment } from '../../environments/environment';

@Injectable()
export class AditionalPointsService {
  
  private url:string = environment.apiUrl
  headers:any = {
    'Authorization' : localStorage.getItem('token'),
    'Accept' : 'application/json',
    'user_id' : localStorage.getItem('user_id')
  }
  constructor(private http: HttpClient) { }

  createAddPoints(body: AditionalPointsModel):Observable<AditionalPointsModel>{
    let headers = {'Content-Type': 'application/json', 'Authorization': this.headers.Authorization, 'Accept' : this.headers.Accept,  'user_id': this.headers.user_id}
    return this.http.post(`${this.url}/point`,body,{headers: headers})
  }

  getAddPoints(id: string):Observable<any>{
    return this.http.get(`${this.url}/points/${id}`,{headers: this.headers})
  }

  deleteAddPoints(id: string){
    return this.http.delete(`${this.url}/point/${id}`,{headers: this.headers})
  }

}