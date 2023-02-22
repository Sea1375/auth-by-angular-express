import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  route!: string | undefined

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route = this.router.url.split('/').pop()?.toString()

    if(this.route === 'account') {
      $('#account_tab').addClass('sections-tab-selected')
    } else if(this.route === 'security') {
      $('#security_tab').addClass('sections-tab-selected')
    }
  }

  onClickSection(id: string): void {
    $('#account_tab').removeClass('sections-tab-selected')
    $('#security_tab').removeClass('sections-tab-selected')

    $('#' + id).addClass('sections-tab-selected')
  }


}
