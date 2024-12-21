import { Component, OnInit } from '@angular/core';
import { ServiceCustomer } from 'src/app/models/ServiceCustomer';
import { ServiceCustomerService } from 'src/app/services/ServiceCustomerService/service-customer.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-find-service',
  templateUrl: './find-service.component.html',
  styleUrls: ['./find-service.component.css']
})
export class FindServiceComponent implements OnInit {
  currentLang: string = 'en';
    serviceCustomers: ServiceCustomer[] = [];
    selectedService!: ServiceCustomer; // Define the selectedService property for the modal

    
  // Variables for the service modal
  isServiceModalOpen = false;
  


  constructor(private translationService: TranslationService,
      private serviceCustomerService: ServiceCustomerService,) { }

  ngOnInit(): void {
    this.fetchServiceCustomers();

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
  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string): string {
    return this.translationService.translate(key);
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
