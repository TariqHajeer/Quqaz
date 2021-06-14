import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientOrderComponent } from './add-client-order.component';

describe('AddClientOrderComponent', () => {
  let component: AddClientOrderComponent;
  let fixture: ComponentFixture<AddClientOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
