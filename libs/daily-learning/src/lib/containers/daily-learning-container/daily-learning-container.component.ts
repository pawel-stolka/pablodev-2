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
} from 'rxjs';
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
  example$!: Observable<any[]>;

  constructor(
    private learningService: DailyLearningService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // #1 demo

    // const source$ = items$.pipe(
    //   groupBy((item) => item.id),
    //   mergeMap((group) => group.pipe(toArray()))
    // );
    // source$.subscribe((x) => console.log('source$', x));

    // #2 real
    const items$ = from([
      {
        id: 1,
        title: 'uno',
      },
      {
        id: 2,
        title: 'dos',
      },
      {
        id: 1,
        title: 'tres',
      },
      {
        id: 2,
        title: 'quatro',
      },
      {
        id: 2,
        title: 'cinqo',
      },
    ]);
    const fetchUrl = 'https://jsonplaceholder.typicode.com/todos';
    const todosFetch$ = this.fromFetch(fetchUrl)//.pipe(switchMap((res) => res.json()))

    this.example$ = todosFetch$.pipe(
      map(data => from(data)),
      mergeAll(),
      groupBy((item: any) => item.userId),
      mergeMap((group) => group.pipe(toArray())),
      toArray(),
      tap(ex => console.log('examples grouped', ex))
    );
    // source$.subscribe((x) => console.log('source$', x));

    const learnings$ = this.learningService.fetchAll();
    // const g$ = learnings$.pipe(
    //   tap(x => console.log('tap1', x)),
    //   groupBy((item: any) => item.category),
    //   mergeMap(group => group.pipe(toArray())),
    // )

    // g$.subscribe(x => console.log('g$', x))

    // this.categories$ = learnings$.pipe(
    //   map((items: LearningItem[]) => items.map((item: LearningItem) => ({
    //     title: item.category,
    //     subtitle: item.subcategory,
    //   }))),
    //   // count()
    //   tap((x: LearningCategory[]) => console.log('cats', x)),
    //   // groupBy((cats: LearningCategory[]) => cats.map((cat: LearningCategory) => cat.title)),
    //   // mergeMap(g => g)
    //   // mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
    // // ).pipe(
    // //   tap(x => console.log('end', x))
    // )

    // this.groups$ = this.categories$.pipe(
    //   mergeMap(res => res), // <- use concatMap() if you care about the order
    //   groupBy(category => category.title, c => c.subtitle),
    //   mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
    //   // map((x: any) => ({
    //   //   name: x[0],
    //   //   amount: x[1]
    //   // })),
    //   tap(x => console.log('xgroups', x))
    // )

    // console.log('groups2', groups)
    // console.log('thiscategories$', thiscategories$)
    this.learnings$ = learnings$;
  }

  fromFetch(url: string): Observable<any> {
    // : Observable<{userId: string, id: string, title: string, completed: boolean}[]> {
    return this.http.get(url)//.pipe(map((res: any) => res.json()))
    .pipe(
      tap(raw => console.log('raw', raw))
    )
  }
}
