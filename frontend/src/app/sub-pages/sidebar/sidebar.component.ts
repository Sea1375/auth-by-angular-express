import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { ApiService } from '../../_services/api-services/api.service'
import { SettingsService } from '../../_services/settings.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() hideEventEmitter = new EventEmitter()

  url !: string

  items = [
    {
      id: 'settings',
      icon: 'setting',
      text: 'DASHBOARD.SETTINGS',
      link: 'settings/account',
    },
    {
      id: 'kyc-verification',
      icon: 'user',
      text: 'DASHBOARD.KYC_VERIFICATION',
      link: 'kyc-verification',
    }
  ]

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/dashboard/').pop()
    this.url = url === undefined ? '' : url
  }

  onSelectedItem(id: string): void {

    // $('.menu-item').each(() => {
    //   $(this).removeClass('menu-item-selected')
    // })

    $('#settings').removeClass('menu-item-selected')
    $('#kyc-verification').removeClass('menu-item-selected')

    $('#' + id).addClass('menu-item-selected')

    this.hideEventEmitter.emit()
  }

  logout(): void {

    this.settingsService.clearUserSetting()
    // this.apiService.logout()
    window.location.reload()

  }
}
