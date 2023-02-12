import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountParticipantComponent } from './account-participant.component';

describe('AccountParticipantComponent', () => {
  let component: AccountParticipantComponent;
  let fixture: ComponentFixture<AccountParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
