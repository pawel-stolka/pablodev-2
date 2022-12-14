import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@pablodev2/api-interfaces';

@Component({
  selector: 'pablodev2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api');
  constructor(private http: HttpClient) {}
}
