import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputTelephoneComponent } from './form-input-telephone.component';

describe('FormInputTelephoneComponent', () => {
  let component: FormInputTelephoneComponent;
  let fixture: ComponentFixture<FormInputTelephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputTelephoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputTelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
