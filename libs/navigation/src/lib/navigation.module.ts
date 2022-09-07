import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '@pablodev2/material';

export const navigationRoutes: Route[] = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [HomeComponent],
})
export class NavigationModule {}
