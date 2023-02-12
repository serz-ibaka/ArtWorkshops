import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderParticipantComponent } from './header-participant.component';

describe('HeaderParticipantComponent', () => {
  let component: HeaderParticipantComponent;
  let fixture: ComponentFixture<HeaderParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderParticipantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
