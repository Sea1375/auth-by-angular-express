import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../_services/app.settings'
import * as Notiflix from 'notiflix'
import { NgxSpinnerService } from 'ngx-spinner'
import { ApiService } from '../../_services/api-services/api.service'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  settings = AppSettings

  confirmationLink!: string | null
  password = ''
  valid = false
  message = ''

  constructor(
    private spinner: NgxSpinnerService,
    private apiService: ApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {

    this.confirmationLink = this.activateRoute.snapshot.paramMap.get('confirmation_link')

    this.spinner.show()

    this.apiService.validateForgotLink(this.confirmationLink ? this.confirmationLink : '').subscribe(
      data => {
        this.spinner.hide()

        if (data.status !== 1) {
          this.invalid(`ERRORS.${data.msg}`)
        }

        // success: show this page

      },
      err => { // something went wrong

        this.spinner.hide()
        this.invalid('ERRORS.INVALID_REQUEST')

      }
    )
  }

  invalid(error: string): void {

    this.translate.get(error).subscribe(res => {
      Notiflix.Notify.failure(res)
    })

    this.router.navigate(['/'])
  }

  onChangePassword(result: any): void {

    this.password = result.value
    this.valid = result.valid

    this.message = this.valid ? '' : 'ERRORS.INCORRECT_PASSWORD'

  }

  onSubmit(): void {
    this.spinner.show()

    this.apiService.resetPassword(this.confirmationLink ? this.confirmationLink : '', this.password).subscribe(
      data => {
        this.spinner.hide()

        if (data.status !== 1) {

          this.message = `ERRORS.${data.msg}`

        } else { // success

          this.translate.get('HOME.RESET_SUCCESS').subscribe(res => {
            Notiflix.Notify.success(res)
          })

          this.router.navigate(['/login'])
        }
      },
      err => { // Something went wrong

        this.spinner.hide()
        this.message = 'ERRORS.INVALID_REQUEST'

      }
    )
  }

}
