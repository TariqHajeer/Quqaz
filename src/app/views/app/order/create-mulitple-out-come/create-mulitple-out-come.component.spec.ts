import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMulitpleOutComeComponent } from './create-mulitple-out-come.component';

describe('CreateMulitpleOutComeComponent', () => {
  let component: CreateMulitpleOutComeComponent;
  let fixture: ComponentFixture<CreateMulitpleOutComeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMulitpleOutComeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMulitpleOutComeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
