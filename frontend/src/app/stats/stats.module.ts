import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatsRoutingModule } from './stats-routing.module';
import { AverageListComponent } from './average-list/average-list.component';
import { GradeFilterComponent } from './grade-filter/grade-filter.component';
import { PassRateComponent } from './pass-rate/pass-rate.component';

@NgModule({
  declarations: [AverageListComponent, GradeFilterComponent, PassRateComponent],
  imports: [CommonModule, FormsModule, StatsRoutingModule]
})
export class StatsModule {}
