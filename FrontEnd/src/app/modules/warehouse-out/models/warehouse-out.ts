export interface WarehouseOut {
  id: number | string;
  productId: number | string; // ID del producto que sale
  productName?: string; // Nombre del producto para mostrar en la tabla
  quantity: number;
  destination: string; // A dónde se dirige el producto (ej: "Venta Local", "Tienda B")
  date: Date; // Fecha de la salida
  responsible: string; // Persona responsable
}