import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) },
            { path: 'HomePage', loadChildren: () => import('./homePage/homePage.module').then(m => m.HomePageModule) },
            { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
            { path: 'income', loadChildren: () => import('./income/income.module').then(m => m.IncomeModule) },
            { path: 'outcome', loadChildren: () => import('./outcome/outcome.module').then(m => m.OutcomeModule) },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
