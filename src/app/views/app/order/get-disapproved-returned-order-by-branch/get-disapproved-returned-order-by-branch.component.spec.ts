import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDisapprovedReturnedOrderByBranchComponent } from './get-disapproved-returned-order-by-branch.component';

describe('GetDisapprovedReturnedOrderByBranchComponent', () => {
  let component: GetDisapprovedReturnedOrderByBranchComponent;
  let fixture: ComponentFixture<GetDisapprovedReturnedOrderByBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetDisapprovedReturnedOrderByBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetDisapprovedReturnedOrderByBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
