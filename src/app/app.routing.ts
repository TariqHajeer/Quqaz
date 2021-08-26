import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  // { path: 'clienthome', loadChildren: () => 
  // import('./client-pages/client-pages.module').then(m => m.ClientPagesModule) },
  { path: 'view', loadChildren: () =>
   import('./views/views.module').then(m => m.ViewsModule) },
  //  {
  //   path: '',
  //   redirectTo: 'clienthome',
  //   pathMatch: 'full'
  // }
  {
    path:'test1',
    component:TestComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
