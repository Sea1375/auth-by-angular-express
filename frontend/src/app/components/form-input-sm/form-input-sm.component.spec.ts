import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputSmComponent } from './form-input-sm.component';

describe('FormInputSmComponent', () => {
  let component: FormInputSmComponent;
  let fixture: ComponentFixture<FormInputSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputSmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
