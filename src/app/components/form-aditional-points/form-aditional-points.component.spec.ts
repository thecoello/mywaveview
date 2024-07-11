import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAditionalPointsComponent } from './form-aditional-points.component';

describe('FormAditionalPointsComponent', () => {
  let component: FormAditionalPointsComponent;
  let fixture: ComponentFixture<FormAditionalPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAditionalPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAditionalPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
