import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSocialCircleComponent } from './icon-social-circle.component';

describe('IconSocialCircleComponent', () => {
  let component: IconSocialCircleComponent;
  let fixture: ComponentFixture<IconSocialCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconSocialCircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSocialCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
