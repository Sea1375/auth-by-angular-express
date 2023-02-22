import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ReCaptchaV3Service } from 'ng-recaptcha'
import { NgxSpinnerService } from 'ngx-spinner'
import * as Notiflix from 'notiflix'
import { ApiService } from '../../_services/api-services/api.service'
import { SettingsService } from '../../_services/settings.service'
import { AppSettings } from '../../_services/app.settings'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  settings = AppSettings

  form: any = {
    email: null,
    username: null,
    password: null,
    passwordConfirm: null
  }

  valid = false
  validUsername = false
  validEmail = false
  validPassword = false
  validPasswordConfirm = false
  checkedTerms = false
  message = '' // error message


  constructor(
    private apiService: ApiService,
    private settingsService: SettingsService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private router: Router,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
  }

  onChangeUsername(result: any): void {

    this.form.username = result.value
    this.validUsername = result.valid

    this.message = this.validUsername ? '' : 'ERRORS.INCORRECT_USERNAME'
    this.valid = this.validEmail && this.validUsername && this.validPassword && this.validPasswordConfirm && this.checkedTerms

  }

  onChangeEmail(result: any): void {

    this.form.email = result.value
    this.validEmail = result.valid

    this.message = this.validEmail ? '' : 'ERRORS.INCORRECT_EMAIL'
    this.valid = this.validEmail && this.validUsername && this.validPassword && this.validPasswordConfirm && this.checkedTerms

  }

  onChangePassword(result: any): void {

    this.form.password = result.value
    this.validPassword = result.valid

    this.message = this.validPassword ? '' : 'ERRORS.INCORRECT_PASSWORD'
    this.valid = this.validEmail && this.validUsername && this.validPassword && this.validPasswordConfirm && this.checkedTerms

  }

  onChangePasswordConfirm(result: any): void {

    this.form.passwordConfirm = result.value
    this.validPasswordConfirm = result.valid

    if (!this.validPasswordConfirm) {
      this.message = 'ERRORS.INCORRECT_PASSWORD'
    } else if (this.form.passwordConfirm !== this.form.password) {
      this.message = 'ERRORS.INCORRECT_CONFIRM'
    } else {
      this.message = ''
    }

    this.validPasswordConfirm = this.validPasswordConfirm && (this.form.passwordConfirm === this.form.password)
    this.valid = this.validEmail && this.validUsername && this.validPassword && this.validPasswordConfirm && this.checkedTerms

  }

  onCheckedTerms(checked: boolean): void {

    this.checkedTerms = checked
    this.valid = this.validEmail && this.validUsername && this.validPassword && this.validPasswordConfirm && this.checkedTerms

  }

  onSubmit(): void {

    // this.recaptchaV3Service.execute('importantAction')
    //   .subscribe((token: string) => {
    //     console.log(token)
    this.spinner.show()

    this.apiService.register(this.form.username, this.form.email, this.form.password, this.form.passwordConfirm).subscribe(
      data => {

        this.spinner.hide()

        if (data.status === 1) { // SignUp Success

          this.translate.get('HOME.SIGNUP_CONFIRMATION').subscribe((res: string) => {
            Notiflix.Notify.success(res)
          })

          this.router.navigate(['/login'])

        } else if (data.status === 0) { // username or email has already registered

          this.message = `ERRORS.${data.msg}`

        }
      },
      err => { // Something went wrong

        this.spinner.hide()
        this.message = 'ERRORS.WRONG'

      }
    )
    // })
  }
}
