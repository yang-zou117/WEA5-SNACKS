import { SnacksServiceService } from './snacks-service.service';
import { TestBed } from '@angular/core/testing';

describe('SnacksServiceService', () => {
  let service: SnacksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnacksServiceService);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });
});
