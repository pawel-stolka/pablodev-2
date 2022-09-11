import { TestBed } from '@angular/core/testing';

import { DailyLearningService } from './daily-learning.service';

describe('DailyLearningService', () => {
  let service: DailyLearningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyLearningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
