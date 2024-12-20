import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/CategoriesService/categorie.service';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/translation.service';
import { Category } from 'src/app/models/Categorie';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css'],
})
export class AddCategorieComponent implements OnInit {
  currentLang: string;
  category: Category = new Category();

  constructor(
    private translationService: TranslationService,
    private categorieService: CategorieService,
    private authService: AuthService,

    private router: Router
  ) {
    this.currentLang = 'en';
  }

  ngOnInit(): void {}

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }

  goToListCategorie() {
    this.router.navigate(['/listCategorie']);
  }

  onSubmit(): void {
    if (!this.category.nom || !this.category.description) {
      alert('Please fill in all required fields.');
      return;
    }

    this.categorieService.addCategorie(this.category).subscribe(
      () => {
        alert('Category added successfully!');
        this.router.navigate(['/listCategorie']);
      },
      (error) => {
        alert('An error occurred while adding the category.');
        console.error(error);
      }
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
