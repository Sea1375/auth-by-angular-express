import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSocialRoundedComponent } from './icon-social-rounded.component';

describe('IconSocialRoundedComponent', () => {
  let component: IconSocialRoundedComponent;
  let fixture: ComponentFixture<IconSocialRoundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSocialRoundedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSocialRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
