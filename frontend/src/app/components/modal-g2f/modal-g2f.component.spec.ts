import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalG2fComponent } from './modal-g2f.component';

describe('ModalComponent', () => {
  let component: ModalG2fComponent;
  let fixture: ComponentFixture<ModalG2fComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalG2fComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalG2fComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
