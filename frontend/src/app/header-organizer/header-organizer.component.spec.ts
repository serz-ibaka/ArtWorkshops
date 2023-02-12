import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOrganizerComponent } from './header-organizer.component';

describe('HeaderOrganizerComponent', () => {
  let component: HeaderOrganizerComponent;
  let fixture: ComponentFixture<HeaderOrganizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOrganizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderOrganizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
