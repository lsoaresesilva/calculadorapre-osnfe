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
import { ManualUploadComponent } from './manual-upload/manual-upload.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {path: 'manual-upload', component: ManualUploadComponent},
  {path: 'nfe-upload', component: NfeUploadComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ClassComponent,
    NfeUploadComponent,
    CostsComponent,
    ContributionMarginComponent,
    PriceCalculationComponent,
    ManualUploadComponent,
    ProductUploadComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    GrowlModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [NotaFiscalEletronicaService],
  bootstrap: [ProductUploadComponent, CostsComponent, ContributionMarginComponent, PriceCalculationComponent]
})
export class AppModule { }
