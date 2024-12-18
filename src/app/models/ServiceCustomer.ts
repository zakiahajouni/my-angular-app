import { SousCategory } from "./SubCategories";

export class ServiceCustomer {
  id!: number;
  nom!: string;
  adresse?: string;
  prix?: string;
  disponibilite?: string;
  description?: string;
  sousCategorie?: SousCategory;



}

