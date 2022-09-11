import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyLearningContainerComponent } from './containers/daily-learning-container/daily-learning-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild([
      { path: '', component: DailyLearningContainerComponent },
    ]),
  ],
  declarations: [DailyLearningContainerComponent],
})
export class DailyLearningModule {}
