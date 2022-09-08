import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { WorkoutGroupsComponent } from './components/workout-groups/workout-groups.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', component: HomeComponent },
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [HomeComponent, WorkoutGroupsComponent],
})
export class WorkoutModule {}
