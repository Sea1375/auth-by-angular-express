import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-icon-social-circle',
  templateUrl: './icon-social-circle.component.html',
  styleUrls: ['./icon-social-circle.component.css']
})

export class IconSocialCircleComponent implements OnInit {
  @Input() icon!: string
  @Input() link!: string

  constructor(
  ) {}

  ngOnInit(): void {

  }
}
