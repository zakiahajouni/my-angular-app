import { Component, OnInit } from '@angular/core';
import { CategorieService } from 'src/app/services/CategoriesService/categorie.service';
import { ServiceDemandesService } from 'src/app/services/DemandeService/service-demandes.service';
import { ServiceProfessionalService } from 'src/app/services/ProfessionalService/service-professional.service';
import { ServiceCustomerService } from 'src/app/services/ServiceCustomerService/service-customer.service';
import { SubCategoriesService } from 'src/app/services/SubCategoriesServices/sub-categories.service';
import { TranslationService } from 'src/app/translation.service';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentLang: string;
  totalCategories: number = 0;
  totalSousCategories: number = 0;
  totalServices: number = 0;
  totalProfessionels: number = 0;
  statusDistribution:any = null;
  //statusDistribution: { [key: string]: number } = {};
  constructor(
    private translationService: TranslationService,
    private categoryService: CategorieService,
    private subCategoriesService: SubCategoriesService,
    private serviceCustomerService: ServiceCustomerService,
    private serviceProfessionalService: ServiceProfessionalService,
    private demandeService: ServiceDemandesService,
    private authService: AuthService,
        private router: Router





  ) {
    this.currentLang = 'en';
  }

  ngOnInit(): void {
    this.fetchTotalCategories();
    this.fetchTotaltotalProfessionel();
    this.fetchTotaltotalService();
    this.fetchTotaltotalSousCategories();
    this.fetchStatusDistribution();
    this.fetchTopServices()
  }

  fetchStatusDistribution() {
    this.demandeService.getStatusDistribution().subscribe((response) => {
       this.statusDistribution = response.body;
      this.renderDonutChart();
    });
  }


  fetchTopServices() {
    this.demandeService.getTopServices().subscribe((data) => {
      this.renderBarChart(data);
    });
  }

  renderBarChart(data: { [key: string]: number }) {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: 'Number of Requests',
            data: Object.values(data),
            backgroundColor: '#4DA768',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Services',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Requests Count',
            },
          },
        },
      },
    });
  }



  renderDonutChart() {
    const ctx = document.getElementById('donutChart') as HTMLCanvasElement;
    const data = {
      labels: Object.keys(this.statusDistribution),
      datasets: [
        {
          data: Object.values(this.statusDistribution),
          backgroundColor: ['#4DA768', '#007bff', '#dc3545'], 
        },
      ],
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
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

  fetchTotalCategories() {
    this.categoryService.getTotalCategories().subscribe(
      (total: number) => {
        this.totalCategories = total;
      },
      (error) => {
        console.error('Error fetching total categories:', error);
      }
    );
  }
  fetchTotaltotalSousCategories() {
    this.subCategoriesService.getTotalSubCtegories().subscribe(
      (total: number) => {
        this.totalSousCategories = total;
      },
      (error) => {
        console.error('Error fetching total categories:', error);
      }
    );
  }
  fetchTotaltotalService() {
    this.serviceCustomerService.getTotalServiceClients().subscribe(
      (total: number) => {
        this.totalServices = total;
      },
      (error) => {
        console.error('Error fetching total categories:', error);
      }
    );
  }

  fetchTotaltotalProfessionel() {
    this.serviceProfessionalService.getTotalProfessionnels().subscribe(
      (total: number) => {
        this.totalProfessionels = total;
      },
      (error) => {
        console.error('Error fetching total categories:', error);
      }
    );
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}



