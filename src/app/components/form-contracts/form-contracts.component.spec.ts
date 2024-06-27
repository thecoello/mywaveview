import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContractsComponent } from './form-contracts.component';

describe('FormContractsComponent', () => {
  let component: FormContractsComponent;
  let fixture: ComponentFixture<FormContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContractsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
