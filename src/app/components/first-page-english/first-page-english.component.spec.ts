import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPageEnglishComponent } from './first-page-english.component';

describe('FirstPageEnglishComponent', () => {
  let component: FirstPageEnglishComponent;
  let fixture: ComponentFixture<FirstPageEnglishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPageEnglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPageEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
