import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranzilaComponent } from './tranzila.component';

describe('TranzilaComponent', () => {
  let component: TranzilaComponent;
  let fixture: ComponentFixture<TranzilaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranzilaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranzilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
