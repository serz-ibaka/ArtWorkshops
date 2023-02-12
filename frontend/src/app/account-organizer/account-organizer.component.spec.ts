import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrganizerComponent } from './account-organizer.component';

describe('AccountOrganizerComponent', () => {
  let component: AccountOrganizerComponent;
  let fixture: ComponentFixture<AccountOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrganizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
