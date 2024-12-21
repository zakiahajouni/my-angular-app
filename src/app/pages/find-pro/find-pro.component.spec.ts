import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProComponent } from './find-pro.component';

describe('FindProComponent', () => {
  let component: FindProComponent;
  let fixture: ComponentFixture<FindProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
