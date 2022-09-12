import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LearningCategory, LearningItem } from '@pablodev2/data-models';
import {
  map,
  tap,
  count,
  Observable,
  groupBy,
  mergeMap,
  toArray,
  from,
  zip,
  of,
  mergeAll,
  switchMap,
  take,
  timer,
  flatMap,
  reduce,
} from 'rxjs';
import { DailyLearningService } from '../../services/daily-learning.service';

@Component({
  selector: 'pablodev2-daily-learning-container',
  templateUrl: './daily-learning-container.component.html',
  styleUrls: ['./daily-learning-container.component.scss'],
})
export class DailyLearningContainerComponent implements OnInit {
  categories$!: Observable<LearningCategory[]>;

  constructor(
    private learningService: DailyLearningService,
  ) {}

  ngOnInit(): void {
    this.categorize();
  }

  categorize() {
    const learnings$ = this.learningService.fetchAll();

    this.categories$ = learnings$.pipe(
      mergeMap((res) => res),
      groupBy((item) => item.category),
      mergeMap((obs) =>
        obs.pipe(
          toArray(),
          map((items: any) => ({ title: obs.key, items }))
        )
      ),
      toArray()
    );
  }
}
