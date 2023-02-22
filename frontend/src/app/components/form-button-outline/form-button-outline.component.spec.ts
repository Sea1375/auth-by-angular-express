import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormButtonOutlineComponent } from './form-button-outline.component';

describe('FormButtonOutlineComponent', () => {
  let component: FormButtonOutlineComponent;
  let fixture: ComponentFixture<FormButtonOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormButtonOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormButtonOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
