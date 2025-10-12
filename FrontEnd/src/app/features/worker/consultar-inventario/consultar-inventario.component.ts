import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../core/services/producto.service';
import { Producto } from '../../../core/models/producto.model';

@Component({
  selector: 'app-consultar-inventario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultar-inventario.component.html',
  styleUrls: ['./consultar-inventario.component.scss']
})
export class ConsultarInventarioComponent implements OnInit {
  private productoService = inject(ProductoService);

  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  termino = '';

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.productosFiltrados = productos;
    });
  }

  filtrarInventario(event: Event): void {
    this.termino = (event.target as HTMLInputElement).value.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.termino) ||
      producto.codigo_sku.toLowerCase().includes(this.termino)
    );
  }
}
