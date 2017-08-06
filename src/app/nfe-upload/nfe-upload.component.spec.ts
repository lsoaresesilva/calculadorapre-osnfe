import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfeUploadComponent } from './nfe-upload.component';

describe('NfeUploadComponent', () => {
  let component: NfeUploadComponent;
  let fixture: ComponentFixture<NfeUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfeUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfeUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
