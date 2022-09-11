import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { WorkoutGroupsComponent } from './components/workout-groups/workout-groups.component';
import { MaterialModule } from '@pablodev2/material';
import { PeriodGroupsComponent } from './components/period-groups/period-groups.component';
import { ExerciseSumPipe } from './pipes/exercise-sum.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [HomeComponent, WorkoutGroupsComponent, PeriodGroupsComponent, ExerciseSumPipe],
})
export class WorkoutModule {}
