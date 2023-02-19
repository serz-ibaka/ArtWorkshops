import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsOrganizerComponent } from './workshops-organizer.component';

describe('WorkshopsOrganizerComponent', () => {
  let component: WorkshopsOrganizerComponent;
  let fixture: ComponentFixture<WorkshopsOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopsOrganizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopsOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
