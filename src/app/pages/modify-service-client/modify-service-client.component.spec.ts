import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyServiceClientComponent } from './modify-service-client.component';

describe('ModifyServiceClientComponent', () => {
  let component: ModifyServiceClientComponent;
  let fixture: ComponentFixture<ModifyServiceClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyServiceClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyServiceClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
