import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { MaterialModule } from '@pablodev2/material';

export const uiRoutes: Route[] = [
  { path: '', component: HomeComponent}
]


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      // { path: '', component: HomeComponent}
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
  ],
  declarations: [HomeComponent],
})
export class UiModule {}
