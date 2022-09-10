import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'pablodev2-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  workouts$ = this.workoutService.workouts$;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.fetchAll().subscribe();
  }
}
