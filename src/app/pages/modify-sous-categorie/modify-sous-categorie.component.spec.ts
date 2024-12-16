import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySousCategorieComponent } from './modify-sous-categorie.component';

describe('ModifySousCategorieComponent', () => {
  let component: ModifySousCategorieComponent;
  let fixture: ComponentFixture<ModifySousCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySousCategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySousCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
