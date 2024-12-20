import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceDemandesService } from 'src/app/services/DemandeService/service-demandes.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit {
  currentLang: string = 'en';
  demandes: any[] = [];
  filteredDemandes: any[] = [];
  filterDate: string = ''; // To hold the default date
  filterAddress: string = '';

  constructor(
    private demandeService: ServiceDemandesService,
    private translationService: TranslationService,
    private router: Router,
        private authService: AuthService,

  ) {}

  ngOnInit(): void {
    this.filterDate = new Date().toISOString().split('T')[0];
    this.getDemandes();
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

  getDemandes(): void {
    this.demandeService.getAllDemandes().subscribe(
      (data) => {
        this.demandes = data;
        this.filterDemandes(); // Apply default filtering
      },
      (error) => console.error('Error fetching demandes:', error)
    );
  }

  filterDemandes(): void {
    this.filteredDemandes = this.demandes.filter((demande) => {
      const matchesDate = this.filterDate
        ? demande.date === this.filterDate
        : true;
      const matchesAddress = this.filterAddress
        ? demande.adresse.toLowerCase().includes(this.filterAddress.toLowerCase())
        : true;
      return matchesDate && matchesAddress;
    });
  }

  accepterDemande(id: number): void {
    if (confirm(this.translate('listRequest.confirmAccept'))) {
      this.demandeService.accepterDemande(id).subscribe(
        () => {
          alert(this.translate('listRequest.acceptSuccess'));
          this.getDemandes(); // Refresh the list
        },
        (error) => console.error('Error accepting demande:', error)
      );
    }
  }

  refuserDemande(id: number): void {
    if (confirm(this.translate('listRequest.confirmRefuse'))) {
      this.demandeService.refuserDemande(id).subscribe(
        () => {
          alert(this.translate('listRequest.refuseSuccess'));
          this.getDemandes(); // Refresh the list
        },
        (error) => console.error('Error refusing demande:', error)
      );
    }
  }

  viewDetails(id: number): void {
    this.router.navigate(['/detailsDemande', id]);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
