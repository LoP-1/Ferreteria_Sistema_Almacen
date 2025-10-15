export interface Provider {
  id: number | string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string; // Dirección es opcional
}