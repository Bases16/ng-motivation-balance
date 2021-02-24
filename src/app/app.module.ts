import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {AdminToolsComponent} from './admin-tools/admin-tools.component';
import {NewSurveyComponent} from './new-survey/new-survey.component';
import {ResultDetailComponent} from './results/result-detail/result-detail.component';
import {EmployeesWithResultsByManager} from './employees-with-results-by-manager/employees-with-results-by-manager.component';
import {AuthPageGuard} from './auth/guards/auth-page.guard';
import {AccessDeniedComponent} from './shared/access-denied/access-denied.component';
import {AdminPagesAuthGuard} from './auth/guards/admin-pages-auth.guard';
import {SpecPagesAuthGuard} from './auth/guards/spec-pages-auth.guard';
import {ResultsComponent} from './results/results.component';
import {ResultsByEmpResolver} from './resolvers/results-by-emp-resolver.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import { ResultsStartComponent } from './results/results-start/results-start.component';
import {FactorsResolver} from './resolvers/factors-resolver.service';
import {EmployeesByManagerResolver} from './resolvers/employees-by-manager-resolver.service';
import { FactorsManagingComponent } from './admin-tools/factors-managing/factors-managing.component';
import { StatsComponent } from './admin-tools/stats/stats.component';
import {ManagersResolver} from './resolvers/managers-resolver.service';
import { ManagersListComponent } from './admin-tools/managers-list/managers-list.component';
import { ManagerOptionsComponent } from './admin-tools/managers-list/manager-options/manager-options.component';
import {ManagerAdminPagesAuthGuard} from './auth/guards/manager-admin-pages-auth.guard';
import {ResultsByManagerResolver} from './resolvers/results-by-manager-resolver.service';
import { EmployeesListComponent } from './admin-tools/employees-list/employees-list.component';
import { EmployeeOptionsComponent } from './admin-tools/employee-options/employee-options.component';
import {EmployeesWithoutManagerResolver} from './resolvers/employees-without-managers-resolver.service';
import { AssignManagerListComponent } from './admin-tools/assign-manager-list/assign-manager-list.component';

const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent, canActivate: [AuthPageGuard]},

  {path: 'admin-tools', component: AdminToolsComponent, canActivate: [AdminPagesAuthGuard]},
  {path: 'admin-tools/factors-managing', component: FactorsManagingComponent},
  {path: 'stats', component: StatsComponent},
  {path: 'admin-tools/managers-list', component: ManagersListComponent,
    resolve: {managers: ManagersResolver},
    children: [
      { path: ':id', component: ManagerOptionsComponent }
    ]
  },
  {path: 'admin-tools/employees-by-manager', component: EmployeesListComponent,
    resolve: {employees: EmployeesByManagerResolver},
    children: [
      { path: ':id', component: EmployeeOptionsComponent }
    ]
  },
  {path: 'admin-tools/employees-without-manager', component: EmployeesListComponent,
    resolve: {employees: EmployeesWithoutManagerResolver},
    children: [
      { path: ':id', component: EmployeeOptionsComponent,
        children: [ {path: 'assign-new-manager', component: AssignManagerListComponent,
                     resolve: {managers: ManagersResolver} }
        ]
      }
    ]
  },

  {path: 'emps-with-res-by-manager', component: EmployeesWithResultsByManager, canActivate: [ManagerAdminPagesAuthGuard],
    resolve: {employees: EmployeesByManagerResolver, results: ResultsByManagerResolver},
    children: [
      {path: ':id', component: ResultDetailComponent}
    ]
  },
  {
    path: 'new-survey', component: NewSurveyComponent,
    canActivate: [SpecPagesAuthGuard], resolve: {activeFactors: FactorsResolver},
  },
  {
    path: 'my-results', component: ResultsComponent,
    canActivate: [SpecPagesAuthGuard], resolve: {results: ResultsByEmpResolver},
    children: [
      { path: '', component: ResultsStartComponent },
      { path: ':id', component: ResultDetailComponent }
    ]
  },

  {path: 'access-denied', component: AccessDeniedComponent},
  {path: '**', redirectTo: '/auth'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    AdminToolsComponent,
    NewSurveyComponent,
    ResultDetailComponent,
    EmployeesWithResultsByManager,
    AccessDeniedComponent,
    ResultsComponent,
    ResultsStartComponent,
    FactorsManagingComponent,
    StatsComponent,
    ManagersListComponent,
    ManagerOptionsComponent,
    EmployeesListComponent,
    EmployeeOptionsComponent,
    AssignManagerListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
