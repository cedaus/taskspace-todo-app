import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthApiService {
   private headers = new HttpHeaders().set('Content-Type', 'application/json');
   private options: any;
   constructor(private http: HttpClient) {
     this.options = {headers: this.headers};
   }
   get(url: string): Observable<any> {
     return this.http.get(url);
   }
   put(url: string, body: any): Observable<any> {
     return this.http.put(url, body, this.options);
   }
   post(url: string, body: any): Observable<any> {
     return this.http.post(url, body, this.options);
   }
   delete(url: string): Observable<any> {
     return this.http.delete(url, this.options);
   }
}


@Injectable()
export class RawApiService {
   private headers = new Headers({'Content-Type': 'application/json'});
   private options: RequestOptions;
   constructor(private http: Http) {
     this.options = new RequestOptions({headers: this.headers});
   }
   get(url: string): Observable<any> {
     return this.http.get(url, this.options).map(response => response.json());
   }
   put(url: string, body: any): Observable<any> {
     return this.http.put(url, body, this.options).map(response => response.json());
   }
   post(url: string, body: any): Observable<any> {
     return this.http.post(url, body, this.options).map(response => response.json());
   }
   delete(url: string): Observable<any> {
     return this.http.delete(url, this.options).map(response => response.json());
   }
}
