import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.css']
})
export class AddProfessionalComponent implements OnInit {
  cities: string[] = [];  // Tableau pour stocker les villes


  currentLang: string;



  constructor(private translationService: TranslationService, private http: HttpClient) {
    this.currentLang = 'en';

  }

  ngOnInit(): void {
    // Récupération du fichier JSON contenant les villes
    this.http.get<string[]>('assets/cities.json').subscribe(
      (data) => {
        this.cities = data;  // Assigner la liste des villes
      },
      (error) => {
        console.error('Erreur lors du chargement des villes :', error);
      }
    );
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Type assertion
    const lang = selectElement.value; // Get the value of the selected option
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }

}