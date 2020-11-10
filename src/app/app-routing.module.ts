import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogInComponent } from './log-in/log-in.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ToDoStatisticComponent } from './to-do-statistic/to-do-statistic.component';
import { ToDoDetailComponent } from './to-do-detail/to-do-detail.component';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'to-do-list', component: ToDoListComponent },
  { path: 'to-do-statistic', component: ToDoStatisticComponent },
  { path: 'to-do-detail/:id', component: ToDoDetailComponent },
  { path: 'app', component: AppComponent },
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
