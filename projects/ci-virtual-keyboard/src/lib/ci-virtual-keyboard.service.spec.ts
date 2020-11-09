import { TestBed } from '@angular/core/testing';

import { CiVirtualKeyboardService } from './ci-virtual-keyboard.service';

describe('CiVirtualKeyboardService', () => {
  let service: CiVirtualKeyboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiVirtualKeyboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
