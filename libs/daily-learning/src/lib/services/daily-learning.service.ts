import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LearningItem } from 'libs/data-models/src';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';

const TEMP_DELAY = 1000;

@Injectable({
  providedIn: 'root'
})
export class DailyLearningService {
  private API_URL = 'http://localhost:3003';
  // private url = `${this.API_URL}/daily-learning`;
  private url = `${this.API_URL}/daily-learning-mock`;

  isPending$: Observable<boolean>;
  learnings$: Observable<LearningItem[]>;


  private _isPendingSubj = new BehaviorSubject(false);
  private _learningSubj = new BehaviorSubject<LearningItem[]>([]);
  

  constructor(private _http: HttpClient) {
    this.isPending$ = this._isPendingSubj.asObservable();
    this.learnings$ = this._learningSubj.asObservable();
  }

  fetchAll() {
    this._isPendingSubj.next(true);
    return this._http.get<LearningItem[]>(this.url).pipe(
      delay(TEMP_DELAY), // ----> bajer temp -----
      finalize(() => {
        this._isPendingSubj.next(false);
      }),
      catchError((err) => {
        console.log('fetching ERROR', err);
        // this.notificationsService.notify({
        //   title: 'Sth was wrong',
        //   type: NotificationType.ERROR,
        //   message: err.message
        // })
        return throwError(err);
      })
    )
  }
}
