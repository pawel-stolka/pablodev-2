import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export { Workout } from "./Workout";
export { DateNameReps } from './DateNameReps'
export { NameReps } from './NameReps'
export { LearningCategory } from './LearningCategory';
export { LearningItem } from './LearningItem';
// import { HTTP_DELAY as DELAY } from './CONSTANTS';
// export const HTTP_DELAY = new InjectionToken<string>(DELAY);

@NgModule({
  imports: [CommonModule],
  // providers: [
  //   {
  //     provide: HTTP_DELAY,
  //     useValue: { HTTP_DELAY}
  //   }
  // ]
})
export class DataModelsModule {}
