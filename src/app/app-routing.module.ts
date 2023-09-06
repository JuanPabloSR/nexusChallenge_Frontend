import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'merchandise',
    loadChildren: () =>
      import('./merchandise/merchandise.module').then(
        (m) => m.MerchandiseModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'merchandise',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
