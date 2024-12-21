import { ServiceCustomer } from "./ServiceCustomer";

export interface Demande {
  id: number;
  date: string;
  adresse: string;
  noteSupplementaire: string;
  clientName: string;
  phoneNumber: string;
  email: string;
  status: string;
  serviceClient: ServiceCustomer;
}
