import { Component, OnInit } from '@angular/core';
import { ApiAuthService } from '../../../../_services/api-services/api-auth.service'
import { SettingsService } from '../../../../_services/settings.service'
import * as Notiflix from 'notiflix'
import { NgxSpinnerService } from 'ngx-spinner'
import { TranslateService } from '@ngx-translate/core'
import { AppSettings } from '../../../../_services/app.settings'

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  appSettings = AppSettings

  form: any = { // change password form
    currentPassword: null,
    password: null,
    passwordConfirm: null,
    g2f_code: null,
  }

  valid = false
  validCurrentPwd = false
  validPassword = false
  validPasswordConfirm = false
  validG2f = false

  g2f_enabled = false
  g2f_key = ''
  qr_url = ''

  enableModal = false // enable modal for G2F
  enableModalChangePassword = false // enable modal for Change Password

  message = '' // 2 factor authentication message
  changePasswordMsg = '' // change password message

  constructor(
    private settingsService: SettingsService,
    private apiAuthService: ApiAuthService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.g2f_enabled = this.settingsService.getStorage('user').g2f_enabled
  }

  onEnable(): void { // Enable G2F authentication

    this.spinner.show()

    let user = this.settingsService.getStorage('user')
    this.apiAuthService.g2fEnable(user).subscribe(
      data => {
        this.spinner.hide()

        if (data.status !== 1) { // Authorization token expired

          this.message = `ERRORS.${data.msg}`

        } else { // Get G2F key and QR code Url

          this.message = ''

          this.g2f_key = data.g2f_key
          this.qr_url = data.qr_url
          this.enableModal = true

        }
      },
      err => { // Something went wrong

        this.spinner.hide()
        this.message = 'ERRORS.WRONG'

      }
    )
  }

  enabled(): void { // Enable G2F authentication

    this.enableModal = false
    this.g2f_enabled = true

    // update storage
    let user = this.settingsService.getStorage('user')
    user.g2f_enabled = 1
    this.settingsService.setStorage('user', user)

    // Notify
    this.translate.get('DASHBOARD.G2F_SUCCESS').subscribe(res => {
      Notiflix.Notify.success(res)
    })
  }

  crossed(): void { // Close G2F enable modal

    this.enableModal = false

  }

  onChangeCurrentPwd(result: any): void { // input for current password

    this.form.currentPassword = result.value
    this.validCurrentPwd = result.valid

    this.changePasswordMsg = this.validCurrentPwd ? '' : 'ERRORS.EMPTY_PASSWORD'
    this.valid = this.validPassword && this.validPasswordConfirm && this.validCurrentPwd
  }

  onChangePassword(result: any): void { // input for new password

    this.form.password = result.value
    this.validPassword = result.valid

    this.changePasswordMsg = this.validPassword ? '' : 'ERRORS.INCORRECT_PASSWORD'
    this.valid = this.validPassword && this.validPasswordConfirm && this.validCurrentPwd

  }

  onChangePasswordConfirm(result: any): void { // input for new password confirmation

    this.form.passwordConfirm = result.value
    this.validPasswordConfirm = result.valid

    if (!this.validPasswordConfirm) {
      this.changePasswordMsg = 'ERRORS.INCORRECT_PASSWORD'
    } else if (this.form.passwordConfirm !== this.form.password) {
      this.changePasswordMsg = 'ERRORS.INCORRECT_CONFIRM'
    } else {
      this.changePasswordMsg = ''
    }

    this.validPasswordConfirm = this.validPasswordConfirm && (this.form.passwordConfirm === this.form.password)
    this.valid = this.validPassword && this.validPasswordConfirm && this.validCurrentPwd

  }

  onChange(): void { // Change Password

    if (this.g2f_enabled) {

      // show modal to confirm 2 factor authentication
      this.enableModalChangePassword = true

    } else {

      this.spinner.show()

      const user = this.settingsService.getStorage('user')

      this.apiAuthService.changePassword(user, this.form.currentPassword, this.form.password, this.form.g2f_code)
        .subscribe(
        data => {

          this.spinner.hide()

          if (data.status !== 1) { // Incorrect current password

            this.changePasswordMsg = `ERRORS.${data.msg}`

          } else { //successfully changed

            this.changePasswordMsg = ''

            this.translate.get('DASHBOARD.PASSWORD_CHANGED').subscribe(res => {
              Notiflix.Notify.success(res)
            })

          }
        },

        err => { // Incorrect token

          this.spinner.hide()
          this.changePasswordMsg = 'ERRORS.INVALID_REQUEST'

        }
      )
    }
  }

  crossedChangePassword(): void { // Close modal of change password

    this.enableModalChangePassword = false

  }

  changed(): void { // Changed password in the case g2f enabled

    this.enableModalChangePassword = false

    this.translate.get('DASHBOARD.PASSWORD_CHANGED').subscribe(res => {
      Notiflix.Notify.success(res)
    })

  }
}
