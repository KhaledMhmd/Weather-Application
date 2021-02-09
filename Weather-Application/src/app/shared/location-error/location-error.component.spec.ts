import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationErrorComponent } from './location-error.component';

describe('LocationErrorComponent', () => {
  let component: LocationErrorComponent;
  let fixture: ComponentFixture<LocationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
