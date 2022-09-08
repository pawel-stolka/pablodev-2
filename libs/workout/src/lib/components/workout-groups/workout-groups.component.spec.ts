import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutGroupsComponent } from './workout-groups.component';

describe('WorkoutGroupsComponent', () => {
  let component: WorkoutGroupsComponent;
  let fixture: ComponentFixture<WorkoutGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutGroupsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
