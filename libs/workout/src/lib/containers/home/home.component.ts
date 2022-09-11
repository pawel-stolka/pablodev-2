import { Component, OnInit } from '@angular/core';
import { DateNameReps, Workout } from '@pablodev2/data-models';
import { map, Observable } from 'rxjs';
import { compareBy, groupWorkouts, WorkoutService } from '../../services/workout.service';

const DESCENDING = false;

@Component({
  selector: 'pablodev2-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isPending$ = this.workoutService.isPending$;
  workoutsGroups$!: Observable<DateNameReps[]>;
  private by = 'byMonth';
  // private by = 'byDay';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    const workouts$ = this.workoutService.fetchAll();

    this.workoutsGroups$ = workouts$.pipe(
      map((workouts: Workout[]) => workouts.sort(compareBy('date', DESCENDING))),
      map((workouts: Workout[]) => groupWorkouts(workouts, this.by))
    );
  }
}
