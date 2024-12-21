import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/translation.service';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { ServiceProfessionalService } from 'src/app/services/ProfessionalService/service-professional.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modify-professional',
  templateUrl: './modify-professional.component.html',
  styleUrls: ['./modify-professional.component.css'],
})
export class ModifyProfessionalComponent implements OnInit {
  cities: string[] = []; // Store cities
  subcategories: any[] = []; // Store subcategories
  professional: any = {}; // Professional data object
  currentLang: string = 'en';

  constructor(
    private translationService: TranslationService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private subCategoriesService: SubCategoriesService,
    private professionalService: ServiceProfessionalService,
     private authService: AuthService,
        private router: Router
  ) {}

  ngOnInit(): void {
    const professionalId = +this.route.snapshot.paramMap.get('id')!;
    this.loadCities();

    // Load subcategories first, and only after that is done load professional
    this.subCategoriesService.getAllSubCtegories().subscribe(
      (data) => {
        this.subcategories = data;
        // Now that subcategories are loaded, load the professional
        this.loadProfessional(professionalId);
      },
      (error) => console.error('Error loading subcategories:', error)
    );
  }

  loadProfessional(id: number): void {
    this.professionalService.getProfessionnelById(id).subscribe(
      (data) => {
        this.professional = data;

        // Now we know subcategories are already loaded
        if (this.professional.sousCategorie && this.professional.sousCategorie.id) {
          const matchedSubcategory = this.subcategories.find(
            (subcategory) => subcategory.id === this.professional.sousCategorie.id
          );
          if (matchedSubcategory) {
            this.professional.sousCategorie = matchedSubcategory;
          }
        }
      },
      (error) => console.error('Error loading professional:', error)
    );
  }


  loadCities(): void {
    this.http.get<string[]>('assets/cities.json').subscribe(
      (data) => (this.cities = data),
      (error) => console.error('Error loading cities:', error)
    );
  }

  loadSubcategories(): void {
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
    this.professionalService.updateProfessionnel(this.professional).subscribe(
      () => {
        alert(this.translate('modifyProfessional.success'));
        this.router.navigate(['/listProfessional']);
      },
      (error) => console.error('Error updating professional:', error)
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
