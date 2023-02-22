import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-form-checkbox-terms',
  templateUrl: './form-checkbox-terms.component.html',
  styleUrls: ['./form-checkbox-terms.component.css']
})
export class FormCheckboxTermsComponent implements OnInit {
  @Output() onClickEvent = new EventEmitter<boolean>()
  checked: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onCheck(): void {
    this.checked = !this.checked
    this.onClickEvent.emit(this.checked)
  }

}
