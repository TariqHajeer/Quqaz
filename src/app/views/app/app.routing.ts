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
            { path: 'user', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
            { path: 'order', loadChildren: () => import('./order/order.module').then(m => m.OrderModule) },
            { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
            { path: 'print', loadChildren: () => import('./print-tamplate/print-tamplate.module').then(m => m.PrintTamplateModule) },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
