import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'
import * as $ from 'jquery'

@Component({
  selector: 'app-form-button-outline-icon',
  templateUrl: './form-button-outline-icon.component.html',
  styleUrls: ['./form-button-outline-icon.component.css']
})
export class FormButtonOutlineIconComponent implements OnInit {
  @Input() text!: string
  @Input() icon!: string
  @Output() onClickEvent = new EventEmitter()
  id: string = ''

  constructor() {

  }

  ngOnInit(): void {
    this.id = this.icon.split('.')[0]
  }

  ngAfterViewInit(): void {
    $('#' + this.id).addClass('button-' + this.id)
  }

  onClick(): void {
    this.onClickEvent.emit()
  }
}
