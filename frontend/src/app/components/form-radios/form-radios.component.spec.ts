import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRadiosComponent } from './form-radios.component';

describe('FormRadiosComponent', () => {
  let component: FormRadiosComponent;
  let fixture: ComponentFixture<FormRadiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRadiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRadiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
