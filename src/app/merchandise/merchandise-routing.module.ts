import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchandiseListComponent } from './pages/merchandise-list/merchandise-list.component';
import { MerchandiseCreateComponent } from './pages/merchandise-create/merchandise-create.component';
import { MerchandiseItemComponent } from './pages/merchandise-item/merchandise-item.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        component: MerchandiseListComponent
      },
      {
        path: 'create',
        component: MerchandiseCreateComponent
      },
      {
        path: 'edit/:id',
        component: MerchandiseCreateComponent
      },
      {
        path: 'details/:id',
        component: MerchandiseItemComponent
      },
      {
        path: '**',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchandiseRoutingModule { }
