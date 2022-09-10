import { Component, Input } from '@angular/core';
import { DateNameReps } from '@pablodev2/data-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'pablodev2-workout-groups',
  templateUrl: './workout-groups.component.html',
  styleUrls: ['./workout-groups.component.scss'],
})
export class WorkoutGroupsComponent {
  @Input() workoutsGroups$!: Observable<DateNameReps[]>;

  // constructor() {}

  // ngOnInit(): void {}
}
