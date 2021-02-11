import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ResultComponent } from './result-list/result/result.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {AuthPageGuard} from './auth/guards/auth-page.guard';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';
import {AdminPagesAuthGuard} from './auth/guards/admin-pages-auth.guard';
import {SpecPagesAuthGuard} from './auth/guards/spec-pages-auth.guard';
import {ManagerPagesAuthGuard} from './auth/guards/manager-pages-auth.guard';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent, canActivate: [AuthPageGuard] },

  { path: 'admin-tools', component: AdminToolsComponent, canActivate: [AdminPagesAuthGuard] },
  { path: 'new-survey', component: NewSurveyComponent, canActivate: [SpecPagesAuthGuard] },
  { path: 'my-employees', component: EmployeeListComponent, canActivate: [ManagerPagesAuthGuard] },
  { path: 'my-surveys', component: ResultListComponent, canActivate: [SpecPagesAuthGuard] },

  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '/auth'}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    AdminToolsComponent,
    NewSurveyComponent,
    ResultListComponent,
    ResultComponent,
    EmployeeListComponent,
    AccessDeniedComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
