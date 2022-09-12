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
  learnings$!: Observable<LearningItem[]>;
  categories$!: Observable<LearningCategory[]>;
  listItems$!: Observable<LearningItem[]>;
  groups$!: Observable<any[]>;
  example$!: Observable<any[]>;
  categories2$!: Observable<LearningCategory[]>;
  start$!: Observable<any[]>;

  constructor(
    private learningService: DailyLearningService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.serious4()
    // this.rangle()
  }

  rangle() {
    const setsOfValues = [
      ["a", "b", "c", "d", "e", "f"],
      [1, 2, 3, 4, 5, 6],
      ["😀", "🐶", "🍏", "⚽️", "🚗", "⌚️"]
    ];

    const threeStreamsOfThings$ = timer(0, 1800).pipe(
      take(3),
      map(outerNumber =>
        timer(0, 250).pipe(
          take(6),
          map(innerNumber => setsOfValues[outerNumber][innerNumber])
        )
      ),
      // flatMap(value => value)
      switchMap(value => value)
    );

    threeStreamsOfThings$.pipe(
      tap(x => console.log('res', x))
    ).subscribe()
  }

  serious4() {
    const people = [
      { name: 'Sue', age: 25 },
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 25 },
      { name: 'Sarah', age: 35 }
    ];
    
    this.start$ = from(people).pipe(
      groupBy(person => person.age, p => p.name),
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      tap(([age, names]) => console.log('what', age, names)),
      // map((res) => [{age: res[0], names: res[1]}]),
      toArray(),
      // map((res) => [{
      //   a: res[0]
      // }]),
      tap(fin => console.log('fin', fin)),
    )
    // .subscribe(console.log);
    
  }

  serious3() {
    this.learnings$ = this.learningService.fetchAll().pipe(
      tap(data => console.log('init data', data)),
    )

    const people = [  
      { name: 'Alex', age: 31 },  
      { name: 'Adam', age: 28 },  
      { name: 'Alia', age: 21 },  
      { name: 'David', age: 35 },  
      { name: 'Rhea', age: 28 },  
      { name: 'Samson', age: 31 },  
      { name: 'Dhoni', age: 35 }  
    ];  
    let thisstart$ = from(people)  
      .pipe(  
        groupBy(  
          person => person.age,  
          p => p.name  
        ),  
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        // map((a) => ({ a: a, b: a})),
        flatMap(x => x),
        // mergeAll(),
        // tap(x => console.log(x))
      )  
      .subscribe(r => console.log('r', r));  
    
    // this.start$ = this.learnings$.pipe(
    //   mergeMap(x => x),
    //   groupBy(l => l.category),
    //   mergeMap(group => group),
    //   // switchMap(v => v.pipe(toArray())),
    //   toArray(),
    //   tap(data => console.log('fin', data)),
    // )
    // .subscribe()

    
  }

  serious2() {
    this.learnings$ = this.learningService.fetchAll().pipe(
      tap(data => console.log('init data', data)),
    )

    // this.categories$
    let thisstart$ = this.learnings$.pipe(
      tap(data => console.log('first', data)),
      mergeAll(),
      groupBy(x => x.category),
      // groupBy((x) => x.map(i => i.category)),
      // flatMap(value => value),
      switchMap(value => value.pipe(tap(x => console.log('?', x)))),//, x => x.pipe(toArray())),
      toArray(),
      tap(data => console.log('fin', data)),
    ).subscribe()
  }

  serious() {
    this.learnings$ = this.learningService.fetchAll().pipe(
      tap(data => console.log('init data', data)),
      
    )
    // this.categories$
    this.start$ = this.learnings$.pipe(
      map(items => items.map(item => ({ category: item.category}))),//, description: item.description  }))),
      tap(res => console.log('res', res)),
      groupBy((x) => x),
      mergeMap(group => group),
      tap(res => console.log('fin', res)),
      // map(data => from(data)),
      // mergeAll(),
      // groupBy(item => item.category),
      // mergeMap((group) => group.pipe(toArray())),
      // map(items => items.map(x => ({
      //   title: x.category,
      // }))),
      // toArray(),
      // toArray(),
      // tap(ex => console.log('examples grouped', ex))
    )
    // .subscribe(res => console.log('res grouped', res))
  }

  fromFetch(url: string): Observable<any> {
    // : Observable<{userId: string, id: string, title: string, completed: boolean}[]> {
    return this.http.get(url)//.pipe(map((res: any) => res.json()))
    .pipe(
      tap(raw => console.log('raw', raw))
    )
  }

  demo() {
    // #1 demo

    // const source$ = items$.pipe(
    //   groupBy((item) => item.id),
    //   mergeMap((group) => group.pipe(toArray()))
    // );
    // source$.subscribe((x) => console.log('source$', x));

    // #2 real
    
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
}
