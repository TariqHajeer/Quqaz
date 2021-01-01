import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOutComeComponent } from './view-out-come.component';

describe('ViewOutComeComponent', () => {
  let component: ViewOutComeComponent;
  let fixture: ComponentFixture<ViewOutComeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOutComeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOutComeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
