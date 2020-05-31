import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppendixAComponent } from './appendix-a.component';

describe('AppendixAComponent', () => {
  let component: AppendixAComponent;
  let fixture: ComponentFixture<AppendixAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppendixAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppendixAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
