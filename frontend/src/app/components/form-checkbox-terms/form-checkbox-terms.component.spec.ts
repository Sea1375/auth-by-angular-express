import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxTermsComponent } from './form-checkbox-terms.component';

describe('FormCheckboxTermsComponent', () => {
  let component: FormCheckboxTermsComponent;
  let fixture: ComponentFixture<FormCheckboxTermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCheckboxTermsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCheckboxTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
