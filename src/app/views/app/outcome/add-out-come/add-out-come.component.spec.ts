import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutComeComponent } from './add-out-come.component';

describe('AddOutComeComponent', () => {
  let component: AddOutComeComponent;
  let fixture: ComponentFixture<AddOutComeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOutComeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOutComeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
