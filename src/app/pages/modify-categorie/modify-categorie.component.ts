import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategorieService } from 'src/app/services/CategoriesService/categorie.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-modify-categorie',
  templateUrl: './modify-categorie.component.html',
  styleUrls: ['./modify-categorie.component.css']
})
export class ModifyCategorieComponent implements OnInit {
  currentLang: string;
  categoryId: any ;

  categoryData: any = { nom: '', description: '' };

  constructor(
    private route: ActivatedRoute,
    private categorieService: CategorieService,
    private translationService: TranslationService
  ) {
    this.currentLang = 'en';
  }

  ngOnInit(): void {
    // Get ID from route
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      this.fetchCategory();
    });
  }

  goToListCategorie(): void {
    window.location.href = '/listCategorie';
  }


  fetchCategory(): void {
    this.categorieService.getCategorieById(this.categoryId).subscribe(
      (data) => {
        this.categoryData = data;
      },
      (error) => {
        console.error('Error fetching category:', error);
      }
    );
  }

  onSubmit(): void {
    this.categorieService.updateCategorie({
      id: this.categoryId,
      nom: this.categoryData.nom,
      description: this.categoryData.description,
    }).subscribe(
      (response) => {
        console.log('Category updated successfully:', response);
        window.location.href = '/listCategorie';
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }
}
