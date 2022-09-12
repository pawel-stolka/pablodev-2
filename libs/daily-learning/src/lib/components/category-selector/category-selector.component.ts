import { Component, Input, OnInit } from '@angular/core';
import { LearningCategory } from '@pablodev2/data-models';
import { Observable } from 'rxjs';

@Component({
  selector: 'pablodev2-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss'],
})
export class CategorySelectorComponent implements OnInit {
  @Input() categories$!: Observable<LearningCategory[]>;
  
  constructor() {}

  ngOnInit(): void {}
}
