import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnerUsersComponent } from './list-partner-users.component';

describe('ListPartnerUsersComponent', () => {
  let component: ListPartnerUsersComponent;
  let fixture: ComponentFixture<ListPartnerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPartnerUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPartnerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
