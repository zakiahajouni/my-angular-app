import { Component, OnInit } from '@angular/core';
import { ServiceCustomer } from 'src/app/models/ServiceCustomer';
import { ServiceCustomerService } from 'src/app/services/ServiceCustomerService/service-customer.service';
import { ServiceProfessionalService } from 'src/app/services/ProfessionalService/service-professional.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  currentLang: string = 'en';
  serviceCustomers: ServiceCustomer[] = [];
  professionals: any[] = [];

  constructor(
    private translationService: TranslationService,
    private serviceCustomerService: ServiceCustomerService,
    private professionalService: ServiceProfessionalService
  ) {}

  ngOnInit(): void {
    this.fetchServiceCustomers();
    this.fetchProfessionals();
  }

  fetchServiceCustomers(): void {
    this.serviceCustomerService.getAllServiceClients().subscribe(
      (data) => {
        this.serviceCustomers = data;
      },
      (error) => {
        console.error('Error fetching service customers:', error);
      }
    );
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
}
