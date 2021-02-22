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
import {ManagerPagesAuthGuard} from './auth/guards/manager-pages-auth.guard';
import {ResultsComponent} from './results/results.component';
import {ResultsResolver} from './results/results-resolver.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import { ResultsStartComponent } from './results/results-start/results-start.component';
import {FactorsResolver} from './new-survey/factors-resolver.service';
import {EmployeeListResolver} from './employees-with-results-by-manager/employee-with-results-by-manager-resolver.service';
import { FactorsManagingComponent } from './admin-tools/factors-managing/factors-managing.component';
import { StatsComponent } from './admin-tools/stats/stats.component';
import { EmployeesManagingComponent } from './admin-tools/employees-managing/employees-managing.component';
import { EmpManageComponent } from './admin-tools/employees-managing/emp-manage/emp-manage.component';
import {ManagersResolver} from './admin-tools/managers-list/managers-resolver.service';
import { ManagersListComponent } from './admin-tools/managers-list/managers-list.component';
import { ManagerOptionsComponent } from './admin-tools/managers-list/manager-options/manager-options.component';
import {ManagerAdminPagesAuthGuard} from './auth/guards/manager-admin-pages-auth.guard';

const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent, canActivate: [AuthPageGuard]},

  {path: 'admin-tools', component: AdminToolsComponent, canActivate: [AdminPagesAuthGuard]},
  {path: 'admin-tools/factors-managing', component: FactorsManagingComponent},
  {path: 'admin-tools/stats', component: StatsComponent},
  {path: 'admin-tools/managers-list', component: ManagersListComponent,
    resolve: {managers: ManagersResolver},
    children: [
      { path: ':id', component: ManagerOptionsComponent }
    ]
  },


  {path: 'admin-tools/employees-managing', component: EmployeesManagingComponent,
    resolve: {employees: ManagersResolver},
    children: [
      { path: ':id', component: EmpManageComponent }
    ]
  },

  {path: 'my-employees', component: EmployeesWithResultsByManager,
    canActivate: [ManagerAdminPagesAuthGuard], resolve: {employees: EmployeeListResolver}
  },
  {
    path: 'new-survey', component: NewSurveyComponent,
    canActivate: [SpecPagesAuthGuard], resolve: {activeFactors: FactorsResolver},
  },
  {
    path: 'my-results', component: ResultsComponent,
    canActivate: [SpecPagesAuthGuard], resolve: {results: ResultsResolver},
    children: [
      { path: '', component: ResultsStartComponent },
      {path: ':id', component: ResultDetailComponent}
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
    EmployeesManagingComponent,
    EmpManageComponent,
    ManagersListComponent,
    ManagerOptionsComponent
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
