import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatePagePage } from './sub-cate-page.page';

describe('SubCatePagePage', () => {
  let component: SubCatePagePage;
  let fixture: ComponentFixture<SubCatePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
