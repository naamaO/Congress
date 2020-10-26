import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationDromStoreComponent } from './information-drom-store.component';

describe('InformationDromStoreComponent', () => {
  let component: InformationDromStoreComponent;
  let fixture: ComponentFixture<InformationDromStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationDromStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationDromStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
