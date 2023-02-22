import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSendG2fComponent } from './modal-send-g2f.component';

describe('ModalSendG2fComponent', () => {
  let component: ModalSendG2fComponent;
  let fixture: ComponentFixture<ModalSendG2fComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSendG2fComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSendG2fComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
