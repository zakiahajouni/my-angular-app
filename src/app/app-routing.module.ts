import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard
import { DetailsDemandeComponent } from './pages/details-demande/details-demande.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Protected routes
  {
    path: 'accueil',
    loadChildren: () => import('./pages/accueil/accueil.module').then(m => m.AccueilModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listCategorie',
    loadChildren: () => import('./pages/list-categorie/list-categorie.module').then(m => m.ListCategorieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'addCategorie',
    loadChildren: () => import('./pages/add-categorie/add-categorie.module').then(m => m.AddCategorieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modifyCategorie/:id',
    loadChildren: () => import('./pages/modify-categorie/modify-categorie.module').then(m => m.ModifyCategorieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listSousCategorie',
    loadChildren: () => import('./pages/list-sous-categorie/list-sous-categorie.module').then(m => m.ListSousCategorieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'addSousCategorie',
    loadChildren: () => import('./pages/add-sous-categorie/add-sous-categorie.module').then(m => m.AddSousCategorieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modifySousCategorie/:id',
    loadChildren: () => import('./pages/modify-sous-categorie/modify-sous-categorie.module').then(m => m.ModifySousCategorieModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listServiceClient',
    loadChildren: () => import('./pages/list-service-client/list-service-client.module').then(m => m.ListServiceClientModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'addServiceClient',
    loadChildren: () => import('./pages/add-service-client/add-service-client.module').then(m => m.AddServiceClientModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modifyServiceClient/:id',
    loadChildren: () => import('./pages/modify-service-client/modify-service-client.module').then(m => m.ModifyServiceClientModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listProfessional',
    loadChildren: () => import('./pages/list-professional/list-professional.module').then(m => m.ListProfessionalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'addProfessional',
    loadChildren: () => import('./pages/add-professional/add-professional.module').then(m => m.AddProfessionalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'modifyProfessional/:id',
    loadChildren: () => import('./pages/modify-professional/modify-professional.module').then(m => m.ModifyProfessionalModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listRequest',
    loadChildren: () => import('./pages/list-request/list-request.module').then(m => m.ListRequestModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details-demande',
    loadChildren: () => import('./pages/details-demande/details-demande.module').then(m => m.DetailsDemandeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detailsDemande/:id',
    component: DetailsDemandeComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
