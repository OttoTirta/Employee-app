import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useValue: ''
})
export class DataService {

  constructor(private url:string, private http:HttpClient) { }
  getAll(){
    return this.http.get(this.url);
  }
  getById(id:string|number){
    return this.http.get(`${this.url}/${id}`);
  }
  insert(resource:any){
    return this.http.post(this.url, resource);
  }
  update(resource:any){
    return this.http.put(`${this.url}/${resource.id}`, resource);
  }
  delete(id:string|number){
    return this.http.delete(`${this.url}/${id}`);
  }
}

