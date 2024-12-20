import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { HttpClient } from '@angular/common/http';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { ServiceProfessionalService } from 'src/app/services/ProfessionalService/service-professional.service';
import { Professional } from 'src/app/models/ProfessionalModel';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.css']
})
export class AddProfessionalComponent implements OnInit {
  cities: string[] = []; // Stores cities
  subcategories: any[] = []; // Stores subcategories
  currentLang: string = 'en';
  professional: Professional = new Professional();

  constructor(
    private translationService: TranslationService,
    private http: HttpClient,
    private subCategoriesService: SubCategoriesService,
    private professionalService: ServiceProfessionalService,
    private authService: AuthService,

    private router: Router

  ) {}

  ngOnInit(): void {
    // Load cities from JSON
    this.http.get<string[]>('assets/cities.json').subscribe(
      (data) => (this.cities = data),
      (error) => console.error('Error loading cities:', error)
    );

    // Load subcategories
    this.subCategoriesService.getAllSubCtegories().subscribe(
      (data) => (this.subcategories = data),
      (error) => console.error('Error loading subcategories:', error)
    );
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

  onSubmit(): void {
     this.professionalService.addProfessionnel(this.professional).subscribe(
      () => {
        alert(this.translate('addProfessional.success'));
        this.router.navigate(['/listProfessional']);

      },
      (error) => console.error('Error adding professional:', error)
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
