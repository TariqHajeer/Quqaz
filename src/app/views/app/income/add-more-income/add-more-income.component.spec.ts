import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreIncomeComponent } from './add-more-income.component';

describe('AddMoreIncomeComponent', () => {
  let component: AddMoreIncomeComponent;
  let fixture: ComponentFixture<AddMoreIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMoreIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoreIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
