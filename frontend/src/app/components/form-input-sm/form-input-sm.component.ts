import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-form-input-sm',
  templateUrl: './form-input-sm.component.html',
  styleUrls: ['./form-input-sm.component.css']
})
export class FormInputSmComponent implements OnInit {
  @Input() text!: string
  @Input() value!: string

  constructor() { }

  ngOnInit(): void {
  }

}
