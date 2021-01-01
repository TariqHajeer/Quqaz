import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncomComponent } from './view-incom.component';

describe('ViewIncomComponent', () => {
  let component: ViewIncomComponent;
  let fixture: ComponentFixture<ViewIncomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIncomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIncomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
