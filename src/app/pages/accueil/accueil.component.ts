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
  selectedService!: ServiceCustomer; // Define the selectedService property for the modal
  
  selectedProfessional: any = null;
  isModalOpen = false;

  // Variables for the service modal
  isServiceModalOpen = false;

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

  // Open and close modal for professionals
  openModal(professional: any): void {
    this.selectedProfessional = professional;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Open and close modal for services
  openServiceModal(service: ServiceCustomer): void {
    this.selectedService = service;
    this.isServiceModalOpen = true;
  }

  closeServiceModal(): void {
    this.isServiceModalOpen = false;
  }

  selectService(customer: ServiceCustomer): void {
    this.selectedService = customer;
  }

  
}
