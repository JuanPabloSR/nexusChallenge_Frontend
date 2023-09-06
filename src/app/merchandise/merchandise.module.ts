import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MerchandiseRoutingModule } from './merchandise-routing.module';
import { MerchandiseCreateComponent } from './pages/merchandise-create/merchandise-create.component';
import { MerchandiseItemComponent } from './pages/merchandise-item/merchandise-item.component';
import { MerchandiseListComponent } from './pages/merchandise-list/merchandise-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MerchandiseCreateComponent,
    MerchandiseItemComponent,
    MerchandiseListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MerchandiseRoutingModule
  ],
  providers: [DatePipe]
})
export class MerchandiseModule { }
