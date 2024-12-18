import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/translation.service';
import { HttpClient } from '@angular/common/http';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { ServiceCustomerService } from 'src/app/services/ServiceCustomerService/service-customer.service';

@Component({
  selector: 'app-modify-service-client',
  templateUrl: './modify-service-client.component.html',
  styleUrls: ['./modify-service-client.component.css']
})
export class ModifyServiceClientComponent implements OnInit {
  cities: string[] = [];
  subcategories: any[] = [];
  serviceCustomers: any = {};
  currentLang: string = 'en';

  constructor(
    private translationService: TranslationService,
    private http: HttpClient,
    private route: ActivatedRoute,
        private router: Router,
    private subCategoriesService: SubCategoriesService,
    private serviceCustomerService: ServiceCustomerService
  ) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    const serviceId = +this.route.snapshot.paramMap.get('id')!;

    // Load subcategories first
    this.loadSubcategories(serviceId);

    // Load cities
    this.http.get<string[]>('assets/cities.json').subscribe(
      data => this.cities = data,
      error => console.error('Error loading cities:', error)
    );
  }

  loadSubcategories(serviceId: number): void {
    this.subCategoriesService.getAllSubCtegories().subscribe(
      data => {
        this.subcategories = data;
        // After subcategories are loaded, load the service client
        this.loadServiceClient(serviceId);
      },
      error => console.error('Error loading subcategories:', error)
    );
  }

  loadServiceClient(id: number): void {
    this.serviceCustomerService.getServiceClientById(id).subscribe(
      serviceClient => {
        this.serviceCustomers = serviceClient;

        // Ensure the serviceCustomers.sousCategorie matches one from the subcategories array
        if (this.serviceCustomers.sousCategorie && this.serviceCustomers.sousCategorie.id) {
          const matchedSubcategory = this.subcategories.find(
            sc => sc.id === this.serviceCustomers.sousCategorie.id
          );
          if (matchedSubcategory) {
            this.serviceCustomers.sousCategorie = matchedSubcategory;
          }
        }
      },
      error => console.error('Error loading service client:', error)
    );
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }

  onSubmit(): void {
    // Update the service client
    this.serviceCustomerService.updateServiceClient(this.serviceCustomers).subscribe(
      () => {
        alert('Service Client updated successfully!');
        this.router.navigate(['/listServiceClient'])
      },
      (error) => console.error('Error updating service client:', error)
    );
  }
}
