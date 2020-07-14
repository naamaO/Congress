import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { notifyComponent } from './notify.component';

describe('notifyComponent', () => {
  let component: notifyComponent;
  let fixture: ComponentFixture<notifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ notifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(notifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
