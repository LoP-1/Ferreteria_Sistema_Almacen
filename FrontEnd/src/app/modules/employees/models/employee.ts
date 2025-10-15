export interface Employee {
  id: number;
  name: string;
  position: string;
  email: string;
  status: 'active' | 'inactive'; // Puedes usar un tipo para estados fijos
}