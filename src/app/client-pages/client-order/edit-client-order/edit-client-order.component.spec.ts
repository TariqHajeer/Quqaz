import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientOrderComponent } from './edit-client-order.component';

describe('EditClientOrderComponent', () => {
  let component: EditClientOrderComponent;
  let fixture: ComponentFixture<EditClientOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClientOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
