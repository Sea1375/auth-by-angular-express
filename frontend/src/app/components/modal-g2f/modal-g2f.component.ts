import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { SettingsService } from '../../_services/settings.service'
import { ApiAuthService } from '../../_services/api-services/api-auth.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { AppSettings } from '../../_services/app.settings'

@Component({
  selector: 'app-modal-g2f',
  templateUrl: './modal-g2f.component.html',
  styleUrls: ['./modal-g2f.component.css']
})
export class ModalG2fComponent implements OnInit {
  @Input() qr_url!: string
  @Input() g2f_key!: string

  @Output() enabledEvent = new EventEmitter()
  @Output() crossEvent = new EventEmitter()

  settings = AppSettings

  email: string = ''
  step = 1
  code = ''
  message = ''
  valid = false

  constructor(
    private settingsService: SettingsService,
    private apiAuthService: ApiAuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.email = this.settingsService.getStorage('user').email
  }

  next(step: number): void {
    this.step = step
    $('#step' + (step-1)).addClass('complete')
  }

  openNewTab(url: string): void {
    window.open(url, '_blank')
  }

  onChangeCode(result: any): void {
    this.code = result.value
    this.valid = result.valid

    this.message = ''
  }

  enableG2F(): void {

    this.spinner.show()

    const user = this.settingsService.getStorage('user')

    this.apiAuthService.g2fValidate(user.id, this.code).subscribe(
      data => {

        this.spinner.hide()

        if (data.status !== 1) { // Invalid code

          this.message = `ERRORS.${data.msg}`
          $('#step4').addClass('error')

        } else { // enabled G2F authentication

          this.message = ''
          this.enabledEvent.emit()

        }
      },
      err => { // invalid request

        this.spinner.hide()
        this.message = 'ERRORS.INVALID_REQUEST'

        $('#step4').addClass('error')
      }
    )
  }

  cross(): void {
    this.crossEvent.emit()
  }
}
