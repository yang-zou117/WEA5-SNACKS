import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRestaurantComponent } from './register-restaurant.component';

describe('RegisterRestaurantComponent', () => {
  let component: RegisterRestaurantComponent;
  let fixture: ComponentFixture<RegisterRestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterRestaurantComponent]
    });
    fixture = TestBed.createComponent(RegisterRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
