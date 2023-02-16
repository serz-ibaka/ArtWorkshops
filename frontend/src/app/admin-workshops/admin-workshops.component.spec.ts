import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkshopsComponent } from './admin-workshops.component';

describe('AdminWorkshopsComponent', () => {
  let component: AdminWorkshopsComponent;
  let fixture: ComponentFixture<AdminWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWorkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
