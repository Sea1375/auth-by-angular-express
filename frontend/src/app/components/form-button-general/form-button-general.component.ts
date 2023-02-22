import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'

@Component({
  selector: 'app-form-button-general',
  templateUrl: './form-button-general.component.html',
  styleUrls: ['./form-button-general.component.css']
})
export class FormButtonGeneralComponent implements OnInit {
  @Input() text!: string
  @Input() disabled!: boolean
  @Output() onClickEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.onClickEvent.emit()
  }

}
