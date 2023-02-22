import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { SettingsComponent } from './pages/dashboard/settings/settings.component'
import { SecurityComponent } from './pages/dashboard/settings/security/security.component'
import { AuthGuard } from './_services/guard/auth.guard'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { AccountComponent } from './pages/dashboard/settings/account/account.component'
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'
import { KycVerificationComponent } from './pages/dashboard/kyc-verification/kyc-verification.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'reset-password/:confirmation_link',
    component: ResetPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {
            path: 'account',
            component: AccountComponent
          },
          {
            path: 'security',
            component: SecurityComponent
          }
        ]
      },
      {
        path: 'kyc-verification',
        component: KycVerificationComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
