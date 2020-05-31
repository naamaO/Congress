import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionNameChairmanHebrewComponent } from './session-name-chairman-hebrew.component';

describe('SessionNameChairmanHebrewComponent', () => {
  let component: SessionNameChairmanHebrewComponent;
  let fixture: ComponentFixture<SessionNameChairmanHebrewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionNameChairmanHebrewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionNameChairmanHebrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
