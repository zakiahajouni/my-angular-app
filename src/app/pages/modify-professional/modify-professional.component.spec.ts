import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProfessionalComponent } from './modify-professional.component';

describe('ModifyProfessionalComponent', () => {
  let component: ModifyProfessionalComponent;
  let fixture: ComponentFixture<ModifyProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyProfessionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
