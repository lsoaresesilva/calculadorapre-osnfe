import { TestBed, inject } from '@angular/core/testing';

import { NotaFiscalEletronicaService } from './nota-fiscal-eletronica.service';

describe('NotaFiscalEletronicaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotaFiscalEletronicaService]
    });
  });

  it('should be created', inject([NotaFiscalEletronicaService], (service: NotaFiscalEletronicaService) => {
    expect(service).toBeTruthy();
  }));

  it('should extract all products from DANFE', inject([NotaFiscalEletronicaService], (service: NotaFiscalEletronicaService) => {
    let produtos = service.extrairProdutos(xml);
    expect(produtos.length).toBeGreaterThan(0);
    expect(service).toBeTruthy();
  }));
});
