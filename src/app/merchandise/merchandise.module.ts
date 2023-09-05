import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchandiseRoutingModule } from './merchandise-routing.module';
import { MerchandiseCreateComponent } from './pages/merchandise-create/merchandise-create.component';
import { MerchandiseItemComponent } from './pages/merchandise-item/merchandise-item.component';
import { MerchandiseListComponent } from './pages/merchandise-list/merchandise-list.component';


@NgModule({
  declarations: [
    MerchandiseCreateComponent,
    MerchandiseItemComponent,
    MerchandiseListComponent
  ],
  imports: [
    CommonModule,
    MerchandiseRoutingModule
  ]
})
export class MerchandiseModule { }
