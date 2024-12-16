import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-add-sous-categorie',
  templateUrl: './add-sous-categorie.component.html',
  styleUrls: ['./add-sous-categorie.component.css']
})
export class AddSousCategorieComponent implements OnInit {
  currentLang: string;



  constructor(private translationService: TranslationService) {
    this.currentLang = 'en';

  }

  ngOnInit(): void {
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
