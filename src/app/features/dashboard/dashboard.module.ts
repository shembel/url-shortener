import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiNotificationModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
    imports: [
        CommonModule,
        TuiNotificationModule,
        TuiBadgeModule,
        RouterModule.forChild(routes),
        DashboardComponent,
    ],
})
export class DashboardModule {}
