import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsTypesComponent } from './exports-types.component';

describe('ExportsTypesComponent', () => {
  let component: ExportsTypesComponent;
  let fixture: ComponentFixture<ExportsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
