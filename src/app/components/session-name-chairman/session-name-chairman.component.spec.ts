import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionNameChairmanComponent } from './session-name-chairman.component';

describe('SessionNameChairmanComponent', () => {
  let component: SessionNameChairmanComponent;
  let fixture: ComponentFixture<SessionNameChairmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionNameChairmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionNameChairmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
