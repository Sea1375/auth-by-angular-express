import { environment } from '../../environments/environment'

export class AppSettings {

  // Regular expressions
  public static REGX_FILL = /.+/
  public static REGX_OPTIONAL = /.{0,}/

  public static REGX_EMAIL = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+))$/
  public static REGX_PWD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  public static REGX_OTP = /^[0-9]{6}$/

  public static G2F_APPSTORE = 'https://apps.apple.com/us/app/google-authenticator/id388497605'
  public static G2F_ANDROID = 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'

  public static dayOfWeek = [
    'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'
  ]

  public static months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  public static shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // APIs
  public static API = environment.server

  // Auth api
  public static API_LOGIN = '/crm/auth/login'
  public static API_LOGIN_G2F = '/crm/auth/login/g2f'
  public static API_REGISTER = '/crm/auth/register'
  public static API_FORGOT_EMAIL = '/crm/account/send/forgot-email'
  public static API_VALIDATE_FORGOT_LINK= '/crm/validate/reset-password'
  public static API_RESET_PASSWORD = '/crm/account/reset-password'
  // public static API_LOGOUT = '/crm/auth/logout'

  public static API_G2F_ENABLE = '/crm/g2f/enable'
  public static API_G2F_VALIDATE = '/crm/g2f/validate'
  public static API_CHANGE_PASSWORD = '/crm/change-password'
}
