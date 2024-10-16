import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang: string = 'en';
  private translations: any = {};
  private translationSubject: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
    this.loadTranslations(this.currentLang);
  }

  private loadTranslations(lang: string) {
    this.http.get(`assets/i18n/${lang}.json`).subscribe((data: any) => {
      this.translations = data;
      this.translationSubject.next(this.translations);
    });
  }

  public changeLanguage(lang: string) {
    this.currentLang = lang;
    this.loadTranslations(lang);
  }

  public translate(key: string): string {
    const keys = key.split('.'); // Split the key on the dot to handle nested keys
    let translation = this.translations;

    for (const k of keys) {
      translation = translation ? translation[k] : null;
      if (!translation) {
        return key; // Fallback to the key itself if translation not found
      }
    }
    return translation;
  }


  public get translations$() {
    return this.translationSubject.asObservable();
  }
}
