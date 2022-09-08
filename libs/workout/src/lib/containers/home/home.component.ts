import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'pablodev2-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  workouts$ = this.workoutService.workouts$;

  constructor(private workoutService: WorkoutService) {}

  // ngOnInit(): void {}
}
