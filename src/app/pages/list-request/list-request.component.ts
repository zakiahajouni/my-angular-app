import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit {

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
