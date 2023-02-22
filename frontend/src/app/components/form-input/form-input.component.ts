import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { regxValidator } from '../../_services/validators/regx.directive'

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {
  @Input() type!: string
  @Input() placeholder!: string
  @Input() regx!: RegExp
  @Output() onChangeEvent = new EventEmitter<any>()

  form!: FormGroup

  constructor(
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        regxValidator(this.regx)
      ])
    })
  }

  get name() {
    return this.form.get('name')
  }

  onChange(value: Event): any {
    this.onChangeEvent.emit({
      valid: !(this.form.get('name')?.invalid && (this.form.get('name')?.dirty || this.form.get('name')?.touched)),
      value: value
    })
  }
}
