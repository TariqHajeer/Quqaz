import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOrdersReturnedToMyBranchComponent } from './get-orders-returned-to-my-branch.component';

describe('GetOrdersReturnedToMyBranchComponent', () => {
  let component: GetOrdersReturnedToMyBranchComponent;
  let fixture: ComponentFixture<GetOrdersReturnedToMyBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOrdersReturnedToMyBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOrdersReturnedToMyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
