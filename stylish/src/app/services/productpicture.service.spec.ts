import { TestBed } from '@angular/core/testing';

import { ProductPictureService } from './productpicture.service';

describe('ProductpictureService', () => {
  let service: ProductPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
