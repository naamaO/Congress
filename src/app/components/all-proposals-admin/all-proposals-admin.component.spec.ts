import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProposalsAdminComponent } from './all-proposals-admin.component';

describe('AllProposalsAdminComponent', () => {
  let component: AllProposalsAdminComponent;
  let fixture: ComponentFixture<AllProposalsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProposalsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProposalsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
