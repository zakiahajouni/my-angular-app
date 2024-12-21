import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/translation.service';
import { HttpClient } from '@angular/common/http';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { ServiceCustomerService } from 'src/app/services/ServiceCustomerService/service-customer.service';
import { Router } from '@angular/router';
import { ServiceCustomer } from 'src/app/models/ServiceCustomer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-service-client',
  templateUrl: './add-service-client.component.html',
  styleUrls: ['./add-service-client.component.css']
})
export class AddServiceClientComponent implements OnInit {
  cities: string[] = [];
  subcategories: any[] = [];
  serviceCustomers: ServiceCustomer = new ServiceCustomer();


  constructor(
    private translationService: TranslationService,
    private http: HttpClient,
    private subCategoriesService: SubCategoriesService,
    private serviceCustomerService: ServiceCustomerService,
    private authService: AuthService,


    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCities();
    this.loadSubcategories();
  }

  loadCities(): void {
    this.http.get<string[]>('assets/cities.json').subscribe(
      (data) => (this.cities = data),
      (error) => console.error('Error loading cities:', error)
    );
  }

  loadSubcategories(): void {
    this.subCategoriesService.getAllSubCtegories().subscribe(
      (data) => (this.subcategories = data),
      (error) => console.error('Error loading subcategories:', error)
    );
  }

  onSubmit(): void {
    this.serviceCustomerService.addServiceClient(this.serviceCustomers).subscribe(
      () => {
        alert('Service Client added successfully!');
        this.router.navigate(['/listServiceClient']);
      },
      (error) => console.error('Error adding service client:', error)
    );
  }



  translate(key: string) {
    return this.translationService.translate(key);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
