import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../shared/auth.guard';


let routes = [
  {
    path: '',
    loadChildren: () => import('./app/app.module').then((m) => m.AppModule),
     canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
  },
    {
      path: 'home',
      component: HomeComponent,
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
  { path: 'unauthorized', component: UnauthorizedComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule {}
