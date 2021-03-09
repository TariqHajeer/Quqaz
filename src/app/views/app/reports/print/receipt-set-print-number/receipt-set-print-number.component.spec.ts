import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptSetPrintNumberComponent } from './receipt-set-print-number.component';

describe('ReceiptSetPrintNumberComponent', () => {
  let component: ReceiptSetPrintNumberComponent;
  let fixture: ComponentFixture<ReceiptSetPrintNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptSetPrintNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptSetPrintNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
