import { Component, Input, OnInit } from '@angular/core';

interface Option {
  label: string,
  checked: boolean
}

@Component({
  selector: 'app-form-radios',
  templateUrl: './form-radios.component.html',
  styleUrls: ['./form-radios.component.css']
})

export class FormRadiosComponent implements OnInit {
  @Input() options!: Option[]
  @Input() name!: string

  valid = true

  constructor() { }

  ngOnInit(): void {
  }

  onChange(label: string): void {

    this.options = this.options.map(function (option) {
      return {
        label: option.label,
        checked: option.label === label ? !option.checked : false
      }
    })

    this.valid = this.options.filter(option => option.checked).length > 0
  }

}
