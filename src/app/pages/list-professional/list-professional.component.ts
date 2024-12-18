import { Component, OnInit } from '@angular/core';
import { ServiceProfessionalService } from 'src/app/services/ProfessionalService/service-professional.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-list-professional',
  templateUrl: './list-professional.component.html',
  styleUrls: ['./list-professional.component.css']
})
export class ListProfessionalComponent implements OnInit {
  professionals: any[] = [];
  currentLang: string = 'en';

  constructor(
    private translationService: TranslationService,
    private professionalService: ServiceProfessionalService
  ) {}

  ngOnInit(): void {
    this.loadProfessionals();
  }

  loadProfessionals(): void {
    this.professionalService.getAllProfessionnels().subscribe(
      (data) => {
        this.professionals = data;
      },
      (error) => {
        console.error('Error fetching professionals:', error);
      }
    );
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  deleteProfessional(id: number): void {
    if (confirm(this.translate('listProfessional.confirmDelete'))) {
      this.professionalService.deleteProfessionnelById(id).subscribe(
        () => {
          alert(this.translate('listProfessional.deleteSuccess'));
          this.loadProfessionals(); // Reload the list after deletion
        },
        (error) => console.error('Error deleting professional:', error)
      );
    }
  }
}
