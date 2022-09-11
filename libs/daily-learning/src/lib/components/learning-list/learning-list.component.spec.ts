import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningListComponent } from './learning-list.component';

describe('LearningListComponent', () => {
  let component: LearningListComponent;
  let fixture: ComponentFixture<LearningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
