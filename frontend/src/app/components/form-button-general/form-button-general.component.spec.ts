import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormButtonGeneralComponent } from './form-button-general.component';

describe('FormButtonGeneralComponent', () => {
  let component: FormButtonGeneralComponent;
  let fixture: ComponentFixture<FormButtonGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormButtonGeneralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormButtonGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
