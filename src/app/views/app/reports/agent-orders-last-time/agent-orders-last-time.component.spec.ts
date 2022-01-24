import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentOrdersLastTimeComponent } from './agent-orders-last-time.component';

describe('AgentOrdersLastTimeComponent', () => {
  let component: AgentOrdersLastTimeComponent;
  let fixture: ComponentFixture<AgentOrdersLastTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentOrdersLastTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentOrdersLastTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
