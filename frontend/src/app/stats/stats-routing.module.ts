import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AverageListComponent } from './average-list/average-list.component';
import { GradeFilterComponent } from './grade-filter/grade-filter.component';
import { PassRateComponent } from './pass-rate/pass-rate.component';
import { AuthGuard } from './../core/guards/auth-guard';

const routes: Routes = [
  { path: 'averages', component: AverageListComponent, canActivate: [AuthGuard] },
  { path: 'filter', component: GradeFilterComponent, canActivate: [AuthGuard] },
  { path: 'pass-rate', component: PassRateComponent, canActivate: [AuthGuard] },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class StatsRoutingModule {}
