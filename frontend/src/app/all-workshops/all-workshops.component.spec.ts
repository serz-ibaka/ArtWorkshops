import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkshopsComponent } from './all-workshops.component';

describe('AllWorkshopsComponent', () => {
  let component: AllWorkshopsComponent;
  let fixture: ComponentFixture<AllWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllWorkshopsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
