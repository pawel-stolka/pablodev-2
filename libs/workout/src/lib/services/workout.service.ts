import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateNameReps, Workout } from 'libs/data-models/src';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { combineLatest } from 'rxjs';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';

const TEMP_DELAY = 1000;
const by = 'byMonth';
// const by = 'byDay';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private API_URL = 'http://localhost:3003';
  // private url = `${this.API_URL}/workouts`;
  private url = `${this.API_URL}/workouts-mock`;

  isPending$: Observable<boolean>;
  contentList$: Observable<Workout[]>;
  // workouts$: Observable<DateNameReps[]>;
  workouts$: Observable<Workout[]>;
  period$: Observable<string>;

  private _isPendingSubj = new BehaviorSubject(false);
  private _contentListSubj = new BehaviorSubject<Workout[]>([]);
  private _periodSubj = new BehaviorSubject<string>(by);

  constructor(private _http: HttpClient) {
    // this.HTTP_DELAY = DELAY;
    this.isPending$ = this._isPendingSubj.asObservable();
    this.contentList$ = this._contentListSubj.asObservable();
    this.period$ = this._periodSubj.asObservable();
    this.workouts$ = combineLatest([this.contentList$, this.period$]).pipe(
      map(([content, by]) => content)
      // map(([content, by]) => this.groupWorkouts(content, by)),
    );
  }

  fetchAll() {
    this._isPendingSubj.next(true);
    return this._http.get<Workout[]>(this.url).pipe(
      delay(TEMP_DELAY), // ----> bajer temp -----
      // tap((workouts: Workout[]) => console.log('fetchAll', workouts)),
      // tap((workouts: Workout[]) => {
      //   this._contentListSubj.next(workouts);
      //   // this.notificationsService.notify({
      //   //   title: 'Ok',
      //   //   type: NotificationType.INFO,
      //   //   message: 'Workouts loaded'
      //   // })
      // }),
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
    );
  }
}

export function compareBy(prop: string, descending = true) {
  const order = descending ? -1 : 1;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (a: any, b: any): number {
    return order * (a[prop] <= b[prop] ? 1 : -1);
  };
}

export function groupWorkouts(data: Workout[], by: string): DateNameReps[] {
  const period = getPeriod(by);
  const groups: any[] = groupBy(data, period);
  return groups.map(([period, list]) => {
    const reps = groupBy(list, (x: any) => x.name);
    const nameReps = reps.map(([name, obj]) => {
      const reps = obj.map((nr: any) => nr.reps);
      const flatReps = [].concat(...reps); // no nested arrays
      return {
        name,
        reps: flatReps,
      };
    });
    return { period, nameReps };
  });
}

function getPeriod(by: string) {
  switch (by) {
    case 'byDay':
      return (x: Workout) => getDay(x.date); //.createdAt);
    // case 'byWeek':
    //   return (x: unknown) => getWeek(x.createdAt);
    case 'byMonth':
      return (x: Workout) => getMonth(x.date); //.createdAt);
    default:
      throw Error(`Invalid ${by} period`);
  }
}

function groupBy(list: any[], prop: any) {
  const map = new Map();
  list.forEach((item) => {
    const key = prop(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return Array.from(map);
}

function getMonth(date: string) {
  return date.substring(0, 7);
}

function getDay(date: string) {
  return date.substring(0, 10);
}
