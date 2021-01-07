import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoreOutcomeComponent } from './add-more-outcome.component';

describe('AddMoreOutcomeComponent', () => {
  let component: AddMoreOutcomeComponent;
  let fixture: ComponentFixture<AddMoreOutcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMoreOutcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMoreOutcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
