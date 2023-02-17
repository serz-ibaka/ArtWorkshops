import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsParticipantComponent } from './workshops-participant.component';

describe('WorkshopsParticipantComponent', () => {
  let component: WorkshopsParticipantComponent;
  let fixture: ComponentFixture<WorkshopsParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopsParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopsParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
