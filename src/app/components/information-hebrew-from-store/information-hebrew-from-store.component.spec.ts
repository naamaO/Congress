import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationHebrewFromStoreComponent } from './information-hebrew-from-store.component';

describe('InformationHebrewFromStoreComponent', () => {
  let component: InformationHebrewFromStoreComponent;
  let fixture: ComponentFixture<InformationHebrewFromStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationHebrewFromStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationHebrewFromStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
