import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceCustomer } from 'src/app/models/ServiceCustomer';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceCustomerService } from 'src/app/services/ServiceCustomerService/service-customer.service';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-list-service-client',
  templateUrl: './list-service-client.component.html',
  styleUrls: ['./list-service-client.component.css']
})
export class ListServiceClientComponent implements OnInit {
  currentLang: string = 'en';
  serviceCustomers: ServiceCustomer[] = [];
  filteredServiceCustomers: ServiceCustomer[] = [];
  searchText: string = '';

  constructor(
    private serviceCustomerService: ServiceCustomerService,
    private translationService: TranslationService,
        private authService: AuthService,
            private router: Router


  ) {}

  ngOnInit(): void {
    this.fetchServiceCustomers();
  }

  fetchServiceCustomers(): void {
    this.serviceCustomerService.getAllServiceClients().subscribe(
      (data) => {
        this.serviceCustomers = data;
        this.filteredServiceCustomers = data; // Initialize filtered list
      },
      (error) => {
        console.error('Error fetching service customers:', error);
      }
    );
  }

  filterServiceCustomers(): void {
    this.filteredServiceCustomers = this.serviceCustomers.filter((customer) =>
      customer.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  deleteServiceCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this service customer?')) {
      this.serviceCustomerService.deleteServiceClientById(id).subscribe(
        () => {
          this.serviceCustomers = this.serviceCustomers.filter((customer) => customer.id !== id);
          this.filterServiceCustomers();
        },
        (error) => {
          console.error('Error deleting service customer:', error);
        }
      );
    }
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
