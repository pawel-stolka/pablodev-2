import { Component, OnInit } from '@angular/core';
import { LearningCategory, LearningItem } from '@pablodev2/data-models';
import {
  map,
  Observable,
  groupBy,
  mergeMap,
  toArray,
  tap,
  combineLatest,
  of,
} from 'rxjs';
import { DailyLearningService } from '../../services/daily-learning.service';

@Component({
  selector: 'pablodev2-daily-learning-container',
  templateUrl: './daily-learning-container.component.html',
  styleUrls: ['./daily-learning-container.component.scss'],
})
export class DailyLearningContainerComponent implements OnInit {
  categories$!: Observable<LearningCategory[]>;
  details$!: Observable<LearningItem[]>;
  // details$!: Observable<any[]>;
  selection$!: Observable<string>;

  constructor(private learningService: DailyLearningService) {}

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
          map((items: LearningItem[]) => ({ title: obs.key, items }))
        )
      ),
      toArray(),
      tap((cats: LearningCategory[]) => console.log('cats', cats))
    );

    this.details$ = combineLatest([
      this.categories$,
      this.selection$
    ]).pipe(
      // map(([categories, selection]) => ([])),
      tap(x => console.log('--x', x)),
      map(([categories, selection]) => {
        console.log('categories, selection', categories, selection)
        const res: LearningItem[] = [{
          id: 0,
          category: '',
          date: '',
          description: 'sfdsf'
        }]

        return res
      })
    )
  }
}
