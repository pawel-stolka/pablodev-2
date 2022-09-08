import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

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


  constructor() { 

    this.contentList$ = this._contentListSubj.asObservable();
    this.period$ = this._periodSubj.asObservable();
    this.workouts$ = combineLatest([this.contentList$, this.period$]).pipe(
      // map(([content, by]) => this.groupWorkouts(content, by)),
    )
  }
}
