import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatetosinglepropComponent } from './navigatetosingleprop.component';

describe('NavigatetosinglepropComponent', () => {
  let component: NavigatetosinglepropComponent;
  let fixture: ComponentFixture<NavigatetosinglepropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatetosinglepropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatetosinglepropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
