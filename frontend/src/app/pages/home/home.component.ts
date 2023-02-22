import { Component, OnInit } from '@angular/core'
import { SettingsService } from '../../_services/settings.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false
  user: any = null
  isRemoved = false

  constructor(
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.settingsService.getStorage('access_token')

    if (this.isLoggedIn) {
      this.user = this.settingsService.getStorage('user')
    }
  }

  removeTag(): void {
    this.isRemoved = true
  }
}
