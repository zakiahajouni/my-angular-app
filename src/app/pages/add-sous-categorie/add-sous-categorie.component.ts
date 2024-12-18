import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Categorie';
import { SousCategory } from 'src/app/models/SubCategories';
import { CategorieService } from 'src/app/services/CategoriesService/categorie.service';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-add-sous-categorie',
  templateUrl: './add-sous-categorie.component.html',
  styleUrls: ['./add-sous-categorie.component.css']
})
export class AddSousCategorieComponent implements OnInit {
  categories: Category[] = [];
  sousCategorie: SousCategory = new SousCategory();

  constructor(
    private translationService: TranslationService,
    private subCategoriesService: SubCategoriesService,
    private categoriesService: CategorieService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  translate(key: string) {
    return this.translationService.translate(key);
  }

  onSubmit(): void {
    this.subCategoriesService.addSubCtegorie(this.sousCategorie).subscribe(
      (response) => {
        alert('Subcategory added successfully!');
        this.router.navigate(['/listSousCategorie']);

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
