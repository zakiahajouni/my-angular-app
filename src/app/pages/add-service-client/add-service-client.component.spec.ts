import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceClientComponent } from './add-service-client.component';

describe('AddServiceClientComponent', () => {
  let component: AddServiceClientComponent;
  let fixture: ComponentFixture<AddServiceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
