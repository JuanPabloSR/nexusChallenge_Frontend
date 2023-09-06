import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MerchandiseRoutingModule } from './merchandise-routing.module';
import { MerchandiseCreateComponent } from './pages/merchandise-create/merchandise-create.component';
import { MerchandiseItemComponent } from './pages/merchandise-item/merchandise-item.component';
import { MerchandiseListComponent } from './pages/merchandise-list/merchandise-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { DialogDeleteComponent } from './components/dialog-delete/dialog-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';


@NgModule({
  declarations: [
    MerchandiseCreateComponent,
    MerchandiseItemComponent,
    MerchandiseListComponent,
    ToolbarComponent,
    FooterComponent,
    DialogDeleteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MerchandiseRoutingModule,
    HttpClientModule,
    RouterTestingModule,
  ],
  providers: [DatePipe]
})
export class MerchandiseModule { }
