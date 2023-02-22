import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'

@Component({
  selector: 'app-form-button-outline',
  templateUrl: './form-button-outline.component.html',
  styleUrls: ['./form-button-outline.component.css']
})
export class FormButtonOutlineComponent implements OnInit {
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
