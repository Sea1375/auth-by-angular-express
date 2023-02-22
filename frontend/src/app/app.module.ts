import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { HomeComponent } from './pages/home/home.component'

import { authInterceptorProviders } from './_helpers/auth.interceptor'
import { environment } from '../environments/environment'

import { InternationalizationModule } from './_services/internationalization/internationalization.module'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { FormInputComponent } from './components/form-input/form-input.component'
import { HeaderComponent } from './sub-pages/header/header.component'
import { FormButtonGeneralComponent } from './components/form-button-general/form-button-general.component'
import { IconSocialCircleComponent } from './components/icon-social-circle/icon-social-circle.component'
import { IconSocialRoundedComponent } from './components/icon-social-rounded/icon-social-rounded.component'
import { ErrorTextComponent } from './components/error-text/error-text.component'
import { FormCheckboxComponent } from './components/form-checkbox/form-checkbox.component'
import { FormCheckboxTermsComponent } from './components/form-checkbox-terms/form-checkbox-terms.component'
import { AlertComponent } from './components/alert/alert.component'
import { SettingsComponent } from './pages/dashboard/settings/settings.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { SidebarComponent } from './sub-pages/sidebar/sidebar.component'
import { SecurityComponent } from './pages/dashboard/settings/security/security.component'
import { ModalG2fComponent } from './components/modal-g2f/modal-g2f.component'
import { FormButtonOutlineComponent } from './components/form-button-outline/form-button-outline.component'
import {
  FormButtonOutlineIconComponent
} from './components/form-button-outline-icon/form-button-outline-icon.component'
import { FormInputSmComponent } from './components/form-input-sm/form-input-sm.component'
import { NgxSpinnerModule } from 'ngx-spinner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component'
import { ModalSendG2fComponent } from './components/modal-send-g2f/modal-send-g2f.component'
import { AccountComponent } from './pages/dashboard/settings/account/account.component'
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'
import { LogoComponent } from './components/icons/logo/logo.component'
import { FlagComponent } from './components/icons/flag/flag.component'
import { KycVerificationComponent } from './pages/dashboard/kyc-verification/kyc-verification.component'
import { GeneralComponent } from './components/icons/general/general.component'
import { FormDatepickerComponent } from './components/form-datepicker/form-datepicker.component'
import { FormDropdownComponent } from './components/form-dropdown/form-dropdown.component'
import { FormRadiosComponent } from './components/form-radios/form-radios.component'
import { FormInputTelephoneComponent } from './components/form-input-telephone/form-input-telephone.component'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/locales/', '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FormInputComponent,
    HeaderComponent,
    FormButtonGeneralComponent,
    IconSocialCircleComponent,
    IconSocialRoundedComponent,
    ErrorTextComponent,
    FormCheckboxComponent,
    FormCheckboxTermsComponent,
    AlertComponent,
    SettingsComponent,
    DashboardComponent,
    SidebarComponent,
    SecurityComponent,
    ModalG2fComponent,
    FormButtonOutlineComponent,
    FormButtonOutlineIconComponent,
    FormInputSmComponent,
    ForgotPasswordComponent,
    ModalSendG2fComponent,
    AccountComponent,
    ResetPasswordComponent,
    LogoComponent,
    FlagComponent,
    KycVerificationComponent,
    GeneralComponent,
    FormDatepickerComponent,
    FormDropdownComponent,
    FormRadiosComponent,
    FormInputTelephoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InternationalizationModule.forRoot({locale_id: 'en-US'}), // iniating with default language: en-US
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RecaptchaV3Module,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  providers: [
    authInterceptorProviders,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha_site_key
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
