import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api-services/api.service'
import { SettingsService } from '../../_services/settings.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false
  lang = 'EN' // current language
  show = false // mobile responsive

  items = [
    { routerLink: '/dashboard/settings/account', text: 'HOME.DASHBOARD' },
    { routerLink: '/', text: 'About' },
    { routerLink: '/', text: 'Services' },
  ]

  languages = [
    { flag: 'en', text: 'LANGS.EN'},
    { flag: 'de', text: 'LANGS.DE'},
    { flag: 'it', text: 'LANGS.IT'},
    { flag: 'zh', text: 'LANGS.ZH'},
  ]

  constructor(
    private settingsService: SettingsService,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {

    this.isLoggedIn = !!this.settingsService.getStorage('access_token')

  }

  onLogout(): void {
    this.settingsService.clearUserSetting()
    // this.apiService.logout()
    window.location.reload()
  }

  toggleMobileMenu(): void { // header mobile responsive

    this.show = !this.show

    if(this.show) {
      $('#mobile-menu-language-select').removeClass('hidden')
    } else {
      $('#mobile-menu-language-select').addClass('hidden')
    }

  }
}
