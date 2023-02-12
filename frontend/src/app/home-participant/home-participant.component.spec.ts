import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeParticipantComponent } from './home-participant.component';

describe('HomeParticipantComponent', () => {
  let component: HomeParticipantComponent;
  let fixture: ComponentFixture<HomeParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
