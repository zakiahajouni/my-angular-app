import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCategorieComponent } from './modify-categorie.component';

describe('ModifyCategorieComponent', () => {
  let component: ModifyCategorieComponent;
  let fixture: ComponentFixture<ModifyCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
