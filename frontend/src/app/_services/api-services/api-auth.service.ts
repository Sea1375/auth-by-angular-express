import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { SettingsService } from '../settings.service'
import { Observable } from 'rxjs'
import { AppSettings } from '../app.settings'

@Injectable({
  providedIn: 'root'
})

export class ApiAuthService {

  settings = AppSettings

  constructor(private http: HttpClient,
              private settingService: SettingsService
  ) {

  }

  createAuthorizationHeader() {

    return new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.settingService.getStorage('access_token'))

  }

  g2fEnable(user: any): Observable<any> {
    let headers = this.createAuthorizationHeader()

    return this.http.post(this.settings.API + this.settings.API_G2F_ENABLE, {
      user
    }, {
      headers
    })
  }

  g2fValidate(id: string, g2f_code: string): Observable<any> {
    let headers = this.createAuthorizationHeader()

    return this.http.post(this.settings.API + this.settings.API_G2F_VALIDATE, {
      id,
      g2f_code
    }, {
      headers
    })
  }

  changePassword(user: any, current_password: string, new_password: string, g2f_code: string): Observable<any> {
    let headers = this.createAuthorizationHeader()

    return this.http.post(this.settings.API + this.settings.API_CHANGE_PASSWORD, {
      user,
      current_password,
      new_password,
      g2f_code
    }, {
      headers
    })
  }
}
