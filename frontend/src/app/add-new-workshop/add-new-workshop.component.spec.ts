import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewWorkshopComponent } from './add-new-workshop.component';

describe('AddNewWorkshopComponent', () => {
  let component: AddNewWorkshopComponent;
  let fixture: ComponentFixture<AddNewWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
