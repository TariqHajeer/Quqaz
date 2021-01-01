import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInComeComponent } from './add-in-come.component';

describe('AddInComeComponent', () => {
  let component: AddInComeComponent;
  let fixture: ComponentFixture<AddInComeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInComeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInComeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
