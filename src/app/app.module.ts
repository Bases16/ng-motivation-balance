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
import {EmployeeListComponent} from './employee-list/employee-list.component';
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

const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent, canActivate: [AuthPageGuard]},

  {path: 'admin-tools', component: AdminToolsComponent, canActivate: [AdminPagesAuthGuard]},
  {path: 'my-employees', component: EmployeeListComponent, canActivate: [ManagerPagesAuthGuard]},
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
    EmployeeListComponent,
    AccessDeniedComponent,
    ResultsComponent,
    ResultsStartComponent
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
