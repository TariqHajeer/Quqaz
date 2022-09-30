import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortageOfCashComponent } from './shortage-of-cash.component';

describe('ShortageOfCashComponent', () => {
  let component: ShortageOfCashComponent;
  let fixture: ComponentFixture<ShortageOfCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortageOfCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortageOfCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
