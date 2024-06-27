import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditionalPointsComponent } from './aditional-points.component';

describe('AditionalPointsComponent', () => {
  let component: AditionalPointsComponent;
  let fixture: ComponentFixture<AditionalPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AditionalPointsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AditionalPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
