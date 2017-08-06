import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ClassComponent } from './class/class.component';

import { GrowlModule } from 'primeng/primeng';
import { NfeUploadComponent } from './nfe-upload/nfe-upload.component';
import { CostsComponent } from './costs/costs.component';
import { ContributionMarginComponent } from './contribution-margin/contribution-margin.component';
import { PriceCalculationComponent } from './price-calculation/price-calculation.component';
import { NotaFiscalEletronicaService } from "app/nota-fiscal-eletronica.service";

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ClassComponent,
    NfeUploadComponent,
    CostsComponent,
    ContributionMarginComponent,
    PriceCalculationComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    GrowlModule
  ],
  providers: [NotaFiscalEletronicaService],
  bootstrap: [NfeUploadComponent, CostsComponent, ContributionMarginComponent, PriceCalculationComponent]
})
export class AppModule { }
