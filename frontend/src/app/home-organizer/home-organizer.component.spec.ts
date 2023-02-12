import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOrganizerComponent } from './home-organizer.component';

describe('HomeOrganizerComponent', () => {
  let component: HomeOrganizerComponent;
  let fixture: ComponentFixture<HomeOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOrganizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
