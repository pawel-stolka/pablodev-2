import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Workout } from "./workout";
export { DateNameReps } from './DateNameReps'
export { NameReps } from './NameReps'

@NgModule({
  imports: [CommonModule],
})
export class DataModelsModule {}
