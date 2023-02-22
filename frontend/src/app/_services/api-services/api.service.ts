import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AppSettings } from '../app.settings'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  settings = AppSettings

  constructor(
    private http: HttpClient,
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.settings.API + this.settings.API_LOGIN, {
      email,
      password
    }, httpOptions)
  }

  g2flogin(email: string, password: string, g2f_code: string): Observable<any> {
    return this.http.post(this.settings.API + this.settings.API_LOGIN_G2F, {
      email,
      password,
      g2f_code
    }, httpOptions)
  }

  register(username: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post(this.settings.API + this.settings.API_REGISTER, {
      username,
      email,
      password,
      password_confirmation
    }, httpOptions)
  }

  forgotPassword(email: string):Observable<any> {
    return this.http.post(this.settings.API + this.settings.API_FORGOT_EMAIL, {
      email
    }, httpOptions)
  }

  validateForgotLink(confirmation_link: string): Observable<any> {
    return this.http.post(this.settings.API + this.settings.API_VALIDATE_FORGOT_LINK, {
      confirmation_link
    }, httpOptions)
  }

  resetPassword(confirmation_link: string, password: string): Observable<any> {
    return this.http.post(this.settings.API + this.settings.API_RESET_PASSWORD, {
      confirmation_link,
      password
    }, httpOptions)
  }

  logout(): void {

    // return this.http.post(this.settings.API + this.settings.API_LOGOUT, null, httpOptions)
  }
}
