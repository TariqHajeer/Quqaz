import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferToSecondBranchComponent } from './transfer-to-second-branch.component';

describe('TransferToSecondBranchComponent', () => {
  let component: TransferToSecondBranchComponent;
  let fixture: ComponentFixture<TransferToSecondBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferToSecondBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferToSecondBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
