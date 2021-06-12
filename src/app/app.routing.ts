import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => 
  import('./client-pages/client-pages.module').then(m => m.ClientPagesModule) },
  { path: 'view', loadChildren: () =>
   import('./views/views.module').then(m => m.ViewsModule) },
   {
    path: '',
    redirectTo: 'clienthome',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
