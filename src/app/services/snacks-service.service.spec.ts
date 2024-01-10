
import { SnacksService } from './snacks-service.service';
import { TestBed } from '@angular/core/testing';

describe('SnacksServiceService', () => {
  let service: SnacksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnacksService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
