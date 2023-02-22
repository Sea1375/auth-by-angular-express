import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  @Input() name!: string
  constructor() { }

  ngOnInit(): void {
  }

}
