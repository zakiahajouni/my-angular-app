import { TestBed } from '@angular/core/testing';

import { ServiceProfessionalService } from './service-professional.service';

describe('ServiceProfessionalService', () => {
  let service: ServiceProfessionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProfessionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
