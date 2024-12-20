import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-list-sous-categorie',
  templateUrl: './list-sous-categorie.component.html',
  styleUrls: ['./list-sous-categorie.component.css']
})
export class ListSousCategorieComponent implements OnInit {
  currentLang: string;
  subCategories: any[] = [];
  filteredSubCategories: any[] = [];
  searchText: string = '';

  constructor(
    private subCategoriesService: SubCategoriesService,
    private translationService: TranslationService,
    public router: Router,
      private authService: AuthService,

  ) {
    this.currentLang = 'en';
  }

  ngOnInit(): void {
    this.fetchSubCategories();
  }

  fetchSubCategories(): void {
    this.subCategoriesService.getAllSubCtegories().subscribe(
      (data) => {
        console.log('Fetched Subcategories:', data);
        this.subCategories = data;
        this.filteredSubCategories = data;
      },
      (error) => {
        console.error('Error fetching subcategories:', error);
      }
    );
  }


  filterSubCategories(): void {
    this.filteredSubCategories = this.subCategories.filter((subCategory) =>
      subCategory.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteSubCategory(id: number): void {
    if (confirm('Are you sure you want to delete this sub-category?')) {
      this.subCategoriesService.deleteSubCtegorieById(id).subscribe(
        () => {
          this.subCategories = this.subCategories.filter(
            (subCategory) => subCategory.id !== id
          );
          this.filterSubCategories();
        },
        (error) => {
          console.error('Error deleting subcategory:', error);
        }
      );
    }
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
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
