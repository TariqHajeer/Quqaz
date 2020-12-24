import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportsTypesComponent } from './imports-types.component';

describe('ImportsTypesComponent', () => {
  let component: ImportsTypesComponent;
  let fixture: ComponentFixture<ImportsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
