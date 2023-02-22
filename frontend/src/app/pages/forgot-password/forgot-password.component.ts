import { Component, OnInit } from '@angular/core'
import { AppSettings } from '../../_services/app.settings'
import { NgxSpinnerService } from 'ngx-spinner'
import { ApiService } from '../../_services/api-services/api.service'
import { TranslateService } from '@ngx-translate/core'
import * as Notiflix from 'notiflix'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  appSettings = AppSettings

  valid = false // valid email
  email = ''
  message = ''

  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {

  }

  onChangeEmail(result: any): void {
    this.email = result.value
    this.valid = result.valid

    this.message = this.valid ? '' : 'ERRORS.INCORRECT_EMAIL'
  }

  onSend(): void {
    this.spinner.show()

    this.apiService.forgotPassword(this.email).subscribe(
      data => {
        this.spinner.hide()

        if (data.status !== 1) { // The email address is invalid

          this.message = `ERRORS.${data.msg}`

        } else { // Valid email address

          this.translate.get('HOME.SIGNUP_CONFIRMATION').subscribe(res => {
            Notiflix.Notify.success(res)
          })

        }
      },
      err => { // Something went wrong

        this.spinner.hide()
        this.message = 'ERRORS.WRONG'

      }
    )
  }
}
