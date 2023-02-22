import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.css']
})
export class FormCheckboxComponent implements OnInit {
  checked: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  onCheck(): void {
    this.checked = !this.checked
  }
}
