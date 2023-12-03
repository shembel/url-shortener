import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [{ path: '', component: MainComponent }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), MainComponent],
})
export class MainModule {}
