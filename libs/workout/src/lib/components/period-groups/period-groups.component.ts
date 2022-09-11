import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pablodev2-period-groups',
  templateUrl: './period-groups.component.html',
  styleUrls: ['./period-groups.component.scss'],
})
export class PeriodGroupsComponent {
  @Input() periodGroups!: any[];
  
  // constructor() {}

  // ngOnInit(): void {}
}
