import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core'
import { AppSettings } from '../../_services/app.settings'
import { NgxSpinnerService } from 'ngx-spinner'
import { ApiAuthService } from '../../_services/api-services/api-auth.service'
import {SettingsService} from "../../_services/settings.service";

@Component({
  selector: 'app-modal-send-g2f',
  templateUrl: './modal-send-g2f.component.html',
  styleUrls: ['./modal-send-g2f.component.css']
})
export class ModalSendG2fComponent implements OnInit {
  @Input() currentPassword!: string
  @Input() password!: string
  @Input() passwordConfirm!: string
  @Output() crossEvent = new EventEmitter()
  @Output() changedEvent = new EventEmitter()

  settings = AppSettings

  g2f_code = '' // input for g2f code
  valid = false // regx for g2f code
  message = '' // error message

  constructor(
    private spinner: NgxSpinnerService,
    private apiAuthService: ApiAuthService,
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
  }

  onChangeG2F(result: any): void {
    this.g2f_code = result.value
    this.valid = result.valid
  }

  onChange(): void {

    this.spinner.show()

    const user = this.settingsService.getStorage('user')
    this.apiAuthService.changePassword(user, this.currentPassword, this.password, this.g2f_code)
      .subscribe(
      data => {

        this.spinner.hide()

        if (data.status !== 1) { // password is incorrect or g2f code is wrong

            this.message = `ERRORS.${data.msg}`

        } else { //successfully changed

          this.message = ''
          this.changedEvent.emit()

        }
      },

      err => { // authorization token expired

        this.spinner.hide()
        this.message = 'ERRORS.INCORRECT_TOKEN'

      }
    )
  }

  cross(): void {
    this.crossEvent.emit()
  }

}
