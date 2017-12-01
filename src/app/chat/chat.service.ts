import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  constructor(private http: HttpClient) { }

  getReply(input: string): Observable<string> {
    return this.http.post('/api/getReply', input, {responseType: 'text'});
  }
}
