import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServicesPage } from './sub-services.page';

describe('SubServicesPage', () => {
  let component: SubServicesPage;
  let fixture: ComponentFixture<SubServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubServicesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
