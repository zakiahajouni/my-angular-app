import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCustomerService } from 'src/app/services/ServiceCustomerService/service-customer.service';
import { ServiceCustomer } from 'src/app/models/ServiceCustomer';
import { TranslationService } from 'src/app/translation.service';
import { Demande } from 'src/app/models/Demande';
import { ServiceDemandesService } from 'src/app/services/DemandeService/service-demandes.service';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  currentLang: string = 'en';
  serviceId!: string;
  selectedService!: ServiceCustomer; // Store the service data
  demande: Demande = new Demande();

  constructor(
    private translationService: TranslationService,
    private route: ActivatedRoute,
    private serviceCustomerService: ServiceCustomerService, // Service for fetching customer data
    private demandeService: ServiceDemandesService,

    private router: Router
    
  ) {}

  ngOnInit(): void {
    // Retrieve query parameters (just the serviceId)
    this.route.queryParams.subscribe(params => {
      this.serviceId = params['serviceId'];
      console.log('Service ID:', this.serviceId); // Debugging line

      // Convert the serviceId to a number
      const serviceIdNumber = +this.serviceId; // Or use `Number(this.serviceId)`

      // Fetch the service details using the converted serviceId
      this.fetchServiceDetails(serviceIdNumber);
    });
  }

  fetchServiceDetails(serviceId: number): void {
    // Call the service method to get the details of the service by ID
    this.serviceCustomerService.getServiceClientById(serviceId).subscribe(
      (data) => {
        this.selectedService = data;
        console.log('Service Details:', this.selectedService); // Debugging line
      },
      (error) => {
        console.error('Error fetching service details:', error);
      }
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
    this.demande.serviceClient = this.selectedService; // Assign the selected service to the demande
    this.demandeService.addDemande(this.demande).subscribe(
      (response: string) => {
        console.log('Demande ajoutée avec succès :', response);
        alert(this.translate('addDemande.success')); // Ou affichez `response` si vous souhaitez montrer le message du backend
        this.router.navigate(['/accueil']);
      },
      (error) => {
        console.error('Erreur lors de l’ajout de la demande :', error);
        alert(this.translate('addDemande.failure'));
      }
    );
  }
  
  
}
