import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStoresComponent } from './show-stores.component';

describe('ShowStoresComponent', () => {
  let component: ShowStoresComponent;
  let fixture: ComponentFixture<ShowStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
