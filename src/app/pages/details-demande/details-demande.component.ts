import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceDemandesService } from 'src/app/services/DemandeService/service-demandes.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-details-demande',
  templateUrl: './details-demande.component.html',
  styleUrls: ['./details-demande.component.css'],
})
export class DetailsDemandeComponent implements OnInit {
  demande: any = null;
  currentLang: string = 'en';

  constructor(
    private route: ActivatedRoute,
    private demandeService: ServiceDemandesService,
    private translationService: TranslationService,
    private authService: AuthService,
     private router: Router


  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getDemandeDetails(+id);
    }
  }

  getDemandeDetails(id: number): void {
    this.demandeService.getDemandeById(id).subscribe(
      (data) => (this.demande = data),
      (error) => console.error('Error fetching demande details:', error)
    );
  }
  translate(key: string): string {
    return this.translationService.translate(key);
  }
  changeLanguage(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
