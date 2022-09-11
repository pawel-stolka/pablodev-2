import { Component, OnInit } from '@angular/core';
import { LearningCategory, LearningItem } from '@pablodev2/data-models';
import { map, tap, count, Observable, groupBy, mergeMap, toArray, from, zip, of } from 'rxjs';
import { DailyLearningService } from '../../services/daily-learning.service';

@Component({
  selector: 'pablodev2-daily-learning-container',
  templateUrl: './daily-learning-container.component.html',
  styleUrls: ['./daily-learning-container.component.scss'],
})
export class DailyLearningContainerComponent implements OnInit {
  learnings$!: Observable<LearningItem[]>;
  categories$!: Observable<LearningCategory[]>;
  listItems$!: Observable<LearningItem[]>;
  groups$!: Observable<any[]>;

  constructor(private learningService: DailyLearningService) { }

  ngOnInit(): void {
    const learnings$ = this.learningService.fetchAll();

    this.categories$ = learnings$.pipe(
      map((items: LearningItem[]) => items.map((item: LearningItem) => ({
        title: item.category,
        subtitle: item.subcategory,
      }))),
      // count()
      // groupBy((key) => key)
      tap(x => console.log('cats', x)),
    ).pipe(
      tap(x => console.log('end', x))
    )

    this.groups$ = this.categories$.pipe(
      mergeMap(res => res), // <- use concatMap() if you care about the order
      groupBy(category => category.title, c => c.subtitle),
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      // map((x: any) => ({
      //   name: x[0],
      //   amount: x[1]
      // })),
      tap(x => console.log('xgroups', x))
    )

    // console.log('groups2', groups)
    // console.log('thiscategories$', thiscategories$)
    this.learnings$ = learnings$;
  }
}
