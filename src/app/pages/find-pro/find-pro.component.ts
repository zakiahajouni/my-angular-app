import { Component, OnInit } from '@angular/core';
import { Professional } from 'src/app/models/ProfessionalModel';
import { ServiceProfessionalService } from 'src/app/services/ProfessionalService/service-professional.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-find-pro',
  templateUrl: './find-pro.component.html',
  styleUrls: ['./find-pro.component.css']
})
export class FindProComponent implements OnInit {
  currentLang: string = 'en';
  professionals: any[] = [];
  selectedProfessional!: Professional;
  isModalOpen = false;






  constructor(
        private translationService: TranslationService,
        private professionalService: ServiceProfessionalService
        
    
  ) { }

  ngOnInit(): void {
    this.fetchProfessionals();

  }
  fetchProfessionals(): void {
    this.professionalService.getAllProfessionnels().subscribe(
      (data) => {
        this.professionals = data;
      },
      (error) => {
        console.error('Error fetching professionals:', error);
      }
    );
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  // Open and close modal for professionals
  openModal(professional: any): void {
    this.selectedProfessional = professional;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }


}
