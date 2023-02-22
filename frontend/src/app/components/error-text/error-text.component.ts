import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-text',
  templateUrl: './error-text.component.html',
  styleUrls: ['./error-text.component.css']
})
export class ErrorTextComponent implements OnInit {
  @Input() message!: string
  constructor() { }

  ngOnInit(): void {
  }

}
