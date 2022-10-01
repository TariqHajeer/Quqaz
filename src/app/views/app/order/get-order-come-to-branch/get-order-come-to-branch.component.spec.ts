import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOrderComeToBranchComponent } from './get-order-come-to-branch.component';

describe('GetOrderComeToBranchComponent', () => {
  let component: GetOrderComeToBranchComponent;
  let fixture: ComponentFixture<GetOrderComeToBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOrderComeToBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOrderComeToBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
