export interface Empleado {
  id_empleado: number;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  rol: 'Administrador' | 'Trabajador';
}