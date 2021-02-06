import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { HomePageComponent } from './homePage.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
    {
        path: '', component: HomePageComponent,
        children: [
            { path: '', redirectTo: 'start', pathMatch: 'full'  ,canActivate: [AuthGuard],},
            { path: 'start', component: StartComponent, canActivate: [AuthGuard], },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomePageRoutingModule { }
