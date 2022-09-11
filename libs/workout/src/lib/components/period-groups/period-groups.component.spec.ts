import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodGroupsComponent } from './period-groups.component';

describe('PeriodGroupsComponent', () => {
  let component: PeriodGroupsComponent;
  let fixture: ComponentFixture<PeriodGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodGroupsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PeriodGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
