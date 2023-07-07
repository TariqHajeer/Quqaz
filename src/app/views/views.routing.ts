import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';
import { NoconnectionComponent } from './noconnection/noconnection.component';
import { SearchOrderComponent } from './search-order/search-order.component';
import { ClientHomeComponent } from './client-home/client-home.component';


let routes = [
  {
    path: '',
    loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
     canActivate: [AuthGuard],
  },
    // {
    //   path: 'home',
    //   component: HomeComponent,
    //   pathMatch: 'full',
    // },
    {
      path: 'home',
      loadChildren: () => import('./home-pages/home-pages.module').then((m) => m.HomePagesModule),
    },
    {
      path: 'searchOrder',
      component: SearchOrderComponent,
      pathMatch: 'full',
    },
    {
      path: 'clientHome',
      component: ClientHomeComponent,
      pathMatch: 'full',
    },
    {
      path: 'app',
      loadChildren: () => import('./app/app.module').then((m) => m.AppModule),

    },
    {
      path: 'user',
      loadChildren: () =>
        import('./user/user.module').then((m) => m.UserModule),
    },
    { path: 'error', component: ErrorComponent },
    { path: 'noconnection', component: NoconnectionComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
