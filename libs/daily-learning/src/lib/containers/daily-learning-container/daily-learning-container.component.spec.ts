import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyLearningContainerComponent } from './daily-learning-container.component';

describe('DailyLearningContainerComponent', () => {
  let component: DailyLearningContainerComponent;
  let fixture: ComponentFixture<DailyLearningContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DailyLearningContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyLearningContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
