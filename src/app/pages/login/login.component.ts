import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authModel } from 'src/app/models/authModel';
 import { AuthService } from 'src/app/services/auth.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  currentLang: string;
  authModel: authModel = new authModel();
  errorMessage: string = '';

  constructor(
    private translationService: TranslationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentLang = 'en';
  }

  ngOnInit(): void {}

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }

  login() {
    if (!this.authModel.email || !this.authModel.password) {
      this.errorMessage = this.translate('login.requiredFields');
      return;
    }

    this.authService.login(this.authModel.email, this.authModel.password).subscribe(
      (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = this.translate('login.requiredFields');
      }
    );
  }
}
