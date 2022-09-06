import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: '', component: HomeComponent}
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [HomeComponent],
})
export class WorkoutModule {}
