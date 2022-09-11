import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyLearningContainerComponent } from './containers/daily-learning-container/daily-learning-container.component';
import { RouterModule } from '@angular/router';
import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
import { LearningListComponent } from './components/learning-list/learning-list.component';
import { MaterialModule } from '@pablodev2/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([
      { path: '', component: DailyLearningContainerComponent },
    ]),
  ],
  declarations: [
    DailyLearningContainerComponent,
    CategorySelectorComponent,
    LearningListComponent,
  ],
})
export class DailyLearningModule {}
