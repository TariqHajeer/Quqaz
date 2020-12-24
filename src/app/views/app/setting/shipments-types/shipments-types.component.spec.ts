import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentsTypesComponent } from './shipments-types.component';

describe('ShipmentsTypesComponent', () => {
  let component: ShipmentsTypesComponent;
  let fixture: ComponentFixture<ShipmentsTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentsTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
