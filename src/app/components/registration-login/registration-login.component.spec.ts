import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationLoginComponent } from './registration-login.component';

describe('RegistrationLoginComponent', () => {
  let component: RegistrationLoginComponent;
  let fixture: ComponentFixture<RegistrationLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
