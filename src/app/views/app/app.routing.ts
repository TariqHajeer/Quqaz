import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) }, 
            { path: 'HomePage', loadChildren: () => import('./homePage/homePage.module').then(m => m.HomePageModule) },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
