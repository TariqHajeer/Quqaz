import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetOrdersComeToMyBranchComponent } from './get-orders-come-to-my-branch.component';

describe('GetOrdersComeToMyBranchComponent', () => {
  let component: GetOrdersComeToMyBranchComponent;
  let fixture: ComponentFixture<GetOrdersComeToMyBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOrdersComeToMyBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetOrdersComeToMyBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
