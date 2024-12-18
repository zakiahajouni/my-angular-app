import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SousCategory } from 'src/app/models/SubCategories';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { CategorieService } from 'src/app/services/CategoriesService/categorie.service';
import { Category } from 'src/app/models/Categorie';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-modify-sous-categorie',
  templateUrl: './modify-sous-categorie.component.html',
  styleUrls: ['./modify-sous-categorie.component.css']
})
export class ModifySousCategorieComponent implements OnInit {
  sousCategoryId!: number;
  sousCategorie: SousCategory = new SousCategory();

  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private subCategoriesService: SubCategoriesService,
    private categorieService: CategorieService,
    public router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    // Fetch the category ID from the route
    this.route.params.subscribe((params) => {
      this.sousCategoryId = +params['id'];
      this.fetchSousCategory();
      this.fetchCategories();
    });
  }

  fetchSousCategory(): void {
    this.subCategoriesService.getSubCtegorieById(this.sousCategoryId).subscribe(
      (data) => {
        this.sousCategorie = data;
      },
      (error) => {
        console.error('Error fetching sub-category:', error);
      }
    );
  }

  fetchCategories(): void {
    this.categorieService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit(): void {
    this.subCategoriesService.updateSubCtegorie({
      id: this.sousCategoryId,
      nom: this.sousCategorie.nom,
      description: this.sousCategorie.description,
      categorie: this.sousCategorie.categorie
    }).subscribe(
      (response) => {
        console.log('Sub-category updated successfully:', response);
        this.router.navigate(['/listSousCategorie']);
      },
      (error) => {
        console.error('Error updating sub-category:', error);
      }
    );
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }
}
