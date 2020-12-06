import { async, TestBed } from '@angular/core/testing';

import { ArrayPipe } from './array.pipe';

describe('ArrayPipe', () => {
  let pipe: ArrayPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ });
  }));

  beforeEach(() => {
    pipe = new ArrayPipe();
  });

  it('create check if Array pipe is created.', () => {
    expect(pipe).toBeTruthy();
  });
});
