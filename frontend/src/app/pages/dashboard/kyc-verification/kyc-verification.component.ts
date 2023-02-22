import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../_services/app.settings'

@Component({
  selector: 'app-kyc-verification',
  templateUrl: './kyc-verification.component.html',
  styleUrls: ['./kyc-verification.component.css']
})
export class KycVerificationComponent implements OnInit {

  settings = AppSettings
  genders = [
    {
      label: 'DASHBOARD.MALE',
      checked: true
    },
    {
      label: 'DASHBOARD.FEMALE',
      checked: false
    }
  ]

   constructor() { }

  ngOnInit(): void {
  }
  
  onChangeFirstname(value: Event) {

  }

  onChangeMiddlename(value: Event) {

  }

  onChangeLastname(value: Event) {

  }

  onChangeBirthday(value: Event) {
    console.log(value)
  }

  onChangeBuildingNumber(value: Event) {

  }

  onChangeUnitNumber(value: Event) {

  }

  onChangeStreetName(value: Event) {

  }

  onChangeStreetType(value: Event) {

  }

  onChangeCity(value: Event) {

  }

  onChangeSuburb(value: Event) {

  }

  onChangeCounty(value: Event) {

  }

  onChangeState(value: Event) {

  }

  onChangeCountry(value: Event) {

  }

  onChangePostalCode(value: Event) {

  }
}
