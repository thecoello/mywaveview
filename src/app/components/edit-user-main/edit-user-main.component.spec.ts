import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserMainComponent } from './edit-user-main.component';

describe('EditUserMainComponent', () => {
  let component: EditUserMainComponent;
  let fixture: ComponentFixture<EditUserMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
