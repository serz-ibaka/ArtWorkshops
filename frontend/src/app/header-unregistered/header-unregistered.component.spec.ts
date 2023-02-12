import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUnregisteredComponent } from './header-unregistered.component';

describe('HeaderUnregisteredComponent', () => {
  let component: HeaderUnregisteredComponent;
  let fixture: ComponentFixture<HeaderUnregisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUnregisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUnregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
