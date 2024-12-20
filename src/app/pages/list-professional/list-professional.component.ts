import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceProfessionalService } from 'src/app/services/ProfessionalService/service-professional.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-list-professional',
  templateUrl: './list-professional.component.html',
  styleUrls: ['./list-professional.component.css'],
})
export class ListProfessionalComponent implements OnInit {
  currentLang: string = 'en';
  professionals: any[] = [];
  filteredProfessionals: any[] = [];
  searchText: string = '';

  constructor(
    private professionalService: ServiceProfessionalService,
    private translationService: TranslationService,
    private router: Router,
        private authService: AuthService,

  ) {}

  ngOnInit(): void {
    this.getProfessionals();
  }

  changeLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  getProfessionals(): void {
    this.professionalService.getAllProfessionnels().subscribe(
      (data) => {
        this.professionals = data;
        this.filteredProfessionals = [...this.professionals]; // Initialize filtered list
      },
      (error) => console.error('Error fetching professionals:', error)
    );
  }

  deleteProfessional(id: number): void {
    if (confirm(this.translate('listProfessional.confirmDelete'))) {
      this.professionalService.deleteProfessionnelById(id).subscribe(
        () => this.getProfessionals(), // Refresh list after deletion
        (error) => console.error('Error deleting professional:', error)
      );
    }
  }

  filterProfessionals(): void {
    const search = this.searchText.trim().toLowerCase();
    if (!search) {
      this.filteredProfessionals = [...this.professionals]; // Reset filter
    } else {
      this.filteredProfessionals = this.professionals.filter((professional) =>
        professional.nomComplet.toLowerCase().includes(search)
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
