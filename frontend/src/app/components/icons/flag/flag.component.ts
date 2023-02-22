import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {
  @Input() flag!: string
  @Input() size!: string
  constructor() { }

  ngOnInit(): void {
  }

}
