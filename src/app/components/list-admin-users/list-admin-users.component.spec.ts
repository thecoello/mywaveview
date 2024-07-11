import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdminUsersComponent } from './list-admin-users.component';

describe('ListPartnerUsersComponent', () => {
  let component: ListAdminUsersComponent;
  let fixture: ComponentFixture<ListAdminUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAdminUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAdminUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
