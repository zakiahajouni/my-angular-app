import { TestBed } from '@angular/core/testing';

import { ServiceDemandesService } from './service-demandes.service';

describe('ServiceDemandesService', () => {
  let service: ServiceDemandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDemandesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
