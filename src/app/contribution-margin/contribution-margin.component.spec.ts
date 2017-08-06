import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionMarginComponent } from './contribution-margin.component';

describe('ContributionMarginComponent', () => {
  let component: ContributionMarginComponent;
  let fixture: ComponentFixture<ContributionMarginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionMarginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
