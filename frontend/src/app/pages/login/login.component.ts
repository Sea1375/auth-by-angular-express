import { Component, OnInit } from '@angular/core'
import { ReCaptchaV3Service } from 'ng-recaptcha'
import { ApiService } from '../../_services/api-services/api.service'
import { SettingsService } from '../../_services/settings.service'
import { Router } from '@angular/router'
import { AppSettings } from '../../_services/app.settings'
import { NgxSpinnerService } from 'ngx-spinner'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  settings = AppSettings

  form: any = {
    email: null,
    password: null
  }

  valid = false
  validEmail = false
  validPassword = false
  message = '' // error message

  g2f_enabled = false
  g2f_code: string = ''

  constructor(
    private apiService: ApiService,
    private settingsService: SettingsService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private router: Router,
    private spinner: NgxSpinnerService
    ) {
  }

  ngOnInit(): void {

  }

  onChangeEmail(result: any): void {
    this.form.email = result.value
    this.validEmail = result.valid

    this.message = this.validEmail ? '' : 'ERRORS.INCORRECT_EMAIL'
    this.valid = this.validEmail && this.validPassword
  }

  onChangePassword(result: any): void {
    this.form.password = result.value
    this.validPassword = result.valid

    this.message = this.validPassword ? '' : 'ERRORS.EMPTY_PASSWORD'
    this.valid = this.validEmail && this.validPassword
  }

  onChangeOTP(result: any): void {
    this.g2f_code = result.value

    this.valid = result.valid
    this.message = this.valid ? '' : 'ERRORS.INCORRECT_OTP'
  }

  onSubmit(): void {
    const {email, password} = this.form

    // this.recaptchaV3Service.execute('importantAction')
    //   .subscribe((token: string) => {
    //     console.log(token)

        this.spinner.show()

        this.apiService.login(email, password).subscribe(
          data => {
            this.spinner.hide()

            if (data.status !== 1) { // unregistered account

              this.message = `ERRORS.${data.msg}`

            } else if(data.activated !== 1) { // inactive account

              this.message = `ERRORS.${data.msg}`

            } else { // registered account

              this.settingsService.setStorage('user', data) // user data saved

              if (data.g2f_enabled === 1) { // G2F enabled account

                this.g2f_enabled = true
                this.valid = false // for input box of G2F Code...

              } else { // G2F disabled account

                this.settingsService.setStorage('access_token', data.access_token) // access_token saved
                this.router.navigate(['/'])

              }
            }
          },
          err => { // something went wrong

            this.spinner.hide()
            this.message = 'ERRORS.INCORRECT_ACCOUNT'
          }
        )
      // })
  }

  onSend(): void {

    this.spinner.show()

    this.apiService.g2flogin(this.form.email, this.form.password, this.g2f_code).subscribe(
      data => {

        this.spinner.hide()

        if (data.status !== 1) { // invalid G2F code

          this.message = `ERRORS.${data.msg}`

        } else { // valid code

          this.settingsService.setStorage('access_token', data.access_token)
          this.router.navigate(['/'])

        }
      },
      err => { // something went wrong

        this.spinner.hide()
        this.message = 'ERRORS.WRONG'

      }
    )
  }

}
