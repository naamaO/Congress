import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigatetosinglepropHerbewComponent } from './navigatetosingleprop-herbew.component';

describe('NavigatetosinglepropHerbewComponent', () => {
  let component: NavigatetosinglepropHerbewComponent;
  let fixture: ComponentFixture<NavigatetosinglepropHerbewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigatetosinglepropHerbewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigatetosinglepropHerbewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
