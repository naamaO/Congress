import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationFromStoreComponent } from './information-from-store.component';

describe('InformationFromStoreComponent', () => {
  let component: InformationFromStoreComponent;
  let fixture: ComponentFixture<InformationFromStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationFromStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationFromStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
