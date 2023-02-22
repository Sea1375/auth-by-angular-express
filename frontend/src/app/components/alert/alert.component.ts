import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() text!: string
  @Input() url!: string
  @Output() removeTagEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  removeTag(): void {
    this.removeTagEvent.emit()
  }

}
