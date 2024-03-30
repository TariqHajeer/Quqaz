import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdersWithoutBranchFilterComponent } from './view-orders-without-branch-filter.component';

describe('ViewOrdersWithoutBranchFilterComponent', () => {
  let component: ViewOrdersWithoutBranchFilterComponent;
  let fixture: ComponentFixture<ViewOrdersWithoutBranchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrdersWithoutBranchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrdersWithoutBranchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
