import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderWithBranchComponent } from './add-order-with-branch.component';

describe('AddOrderWithBranchComponent', () => {
  let component: AddOrderWithBranchComponent;
  let fixture: ComponentFixture<AddOrderWithBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderWithBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderWithBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
