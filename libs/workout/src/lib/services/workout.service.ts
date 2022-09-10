import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from 'libs/data-models/src';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { combineLatest } from 'rxjs';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';

const DESCENDING = false;
const TEMP_DELAY = 1000;

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private API_URL = '';

  // isPending$: Observable<boolean>;
  // contentList$: Observable<Workout[]>;
  contentList$: Observable<unknown[]>;
  // workouts$: Observable<DateNameReps[]>;
  workouts$: Observable<unknown[]>;
  period$: Observable<string>;

  private by = 'byMonth';
  // private by = 'byDay';

  // private _contentListSubj = new BehaviorSubject<Workout[]>([]);
  private _contentListSubj = new BehaviorSubject<unknown[]>([]);
  private _periodSubj = new BehaviorSubject<string>(this.by);

  constructor(private _http: HttpClient) {
    this.contentList$ = this._contentListSubj.asObservable();
    this.period$ = this._periodSubj.asObservable();
    this.workouts$ = combineLatest([this.contentList$, this.period$])
      .pipe
      // map(([content, by]) => this.groupWorkouts(content, by)),
      ();
  }

  fetchAll() {
    return this._http.get<Workout[]>(`${this.API_URL}/workout`).pipe(
      delay(TEMP_DELAY), // ----> bajer temp -----
      // tap((workouts: Workout[]) => console.log('fetchAll', workouts)),
      map((workouts: Workout[]) =>
        workouts.sort(compareBy('date', DESCENDING))
      ),
      tap((workouts: Workout[]) => {
        this._contentListSubj.next(workouts);
        // this.notificationsService.notify({
        //   title: 'Ok',
        //   type: NotificationType.INFO,
        //   message: 'Workouts loaded'
        // })
      }),
      finalize(() => {
        // this._isPendingSubj.next(false);
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
    );
  }
}

// function getMonth(date: string) {
//   return date.substring(0, 7);
// }

// function getDay(date: string) {
//   return date.substring(0, 10);
// }

function compareBy(prop: string, descending = true) {
  const order = descending ? -1 : 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (a: any, b: any): number {
    return order * (a[prop] <= b[prop] ? 1 : -1);
  };
}
