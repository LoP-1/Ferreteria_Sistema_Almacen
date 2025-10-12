export interface Producto {
  id_producto: number;
  codigo_sku: string;
  nombre: string;
  descripcion: string;
  precio_compra: number;
  stock_actual: number;
  stock_minimo: number;
}