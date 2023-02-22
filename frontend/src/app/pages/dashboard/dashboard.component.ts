import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  show = false

  constructor() { }

  ngOnInit(): void {
  }

  onToggle(show: boolean) {
    this.show = show

    if (this.show) {
      $('#sidebar').removeClass('hidden')
    } else {
      $('#sidebar').addClass('hidden')
    }
  }

}
