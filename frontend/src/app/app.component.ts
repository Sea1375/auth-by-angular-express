import { Component } from '@angular/core'
import * as Notiflix from 'notiflix'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
  ) {}

  ngOnInit(): void {
    Notiflix.Notify.init({
      timeout: 10000,
      position: 'center-top'
    })
  }

}
