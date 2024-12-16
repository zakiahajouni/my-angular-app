import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceClientComponent } from './list-service-client.component';

describe('ListServiceClientComponent', () => {
  let component: ListServiceClientComponent;
  let fixture: ComponentFixture<ListServiceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServiceClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServiceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
