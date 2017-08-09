import { TestBed, inject } from '@angular/core/testing';

import { MensagensAvisoService } from './mensagens-aviso.service';

describe('MensagensAvisoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MensagensAvisoService]
    });
  });

  it('should be created', inject([MensagensAvisoService], (service: MensagensAvisoService) => {
    expect(service).toBeTruthy();
  }));
});
