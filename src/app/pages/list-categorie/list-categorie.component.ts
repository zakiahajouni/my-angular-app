import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/CategoriesService/categorie.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css'],
})
export class ListCategorieComponent implements OnInit {
  currentLang: string;
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchText: string = '';

  constructor(
    private categorieService: CategorieService,
    private translationService: TranslationService,
    private router: Router,

  ) {
    this.currentLang = 'en';
  }

  ngOnInit(): void {
    this.getCategories();
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

  getCategories(): void {
    this.categorieService.getAllCategories().subscribe((data) => {
      console.log('Fetched categories:', data);
      this.categories = data; // Set fetched categories
      this.filteredCategories = [...this.categories]; // Initialize filtered categories
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categorieService.deleteCategorieById(id).subscribe(() => {
        this.getCategories(); // Refresh the list after deletion
      });
    }
  }

  editCategory(category: any): void {
    console.log('Edit category:', category);
  }

  filterCategories(): void {
    const search = this.searchText.trim().toLowerCase(); // Normalize input
    if (!search) {
      this.filteredCategories = [...this.categories]; // Reset to full list if empty
    } else {
      this.filteredCategories = this.categories.filter((category) =>
        category.nom.toLowerCase().includes(search)
      );
    }
  }
}
