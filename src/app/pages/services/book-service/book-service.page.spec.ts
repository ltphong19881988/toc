import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookServicePage } from './book-service.page';

describe('BookServicePage', () => {
  let component: BookServicePage;
  let fixture: ComponentFixture<BookServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
