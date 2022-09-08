import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pablodev2-workout-groups',
  templateUrl: './workout-groups.component.html',
  styleUrls: ['./workout-groups.component.scss'],
})
export class WorkoutGroupsComponent {
  // @Input() workouts$!: Observable<DateNameReps[]>;
  @Input() workouts$!: Observable<unknown[]>;

  // constructor() {}

  // ngOnInit(): void {}
}
