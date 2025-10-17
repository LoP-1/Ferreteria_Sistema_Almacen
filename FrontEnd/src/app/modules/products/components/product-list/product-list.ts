import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product as ProductService, BackendProduct } from '../../services/product';
import { FormsModule } from '@angular/forms';

export interface Product {
  id: number;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  // --- Estado del Componente ---
  public products: Product[] = [];
  public isModalOpen = false;
  public selectedProduct: Product | null = null;
  public searchTerm: string = '';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadProducts();
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (backendData: BackendProduct[]) => {
        // Verificamos que la respuesta sea un array
        if (!Array.isArray(backendData)) {
          console.error('La respuesta del backend no es un array. Se recibió:', backendData);
          return;
        }

        const transformedProducts: Product[] = [];
        // Usamos el mismo bucle robusto del componente que sí funciona
        for (const bp of backendData) {
          try {
            if (bp) {
              transformedProducts.push(this.transformBackendProduct(bp));
            } else {
              console.warn('Se encontró un elemento nulo en los datos del backend.');
            }
          } catch (e) {
            console.error('Error al transformar un producto:', bp, 'Error:', e);
          }
        }

        // Asignamos el nuevo array transformado
        this.products = transformedProducts;
        console.log('Productos cargados y transformados:', this.products);
        
        // Forzamos la detección de cambios para actualizar la vista
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error en la petición HTTP al cargar los productos:', err);
      }
    });
  }

  /**
   * Transforma un objeto de producto del backend a la interfaz del frontend.
   * Este método centraliza la lógica de transformación y validación.
   */
  private transformBackendProduct(backendProd: BackendProduct): Product {
    if (!backendProd || !backendProd.idProducto || !backendProd.nombre) {
      throw new Error('El objeto Producto del backend no tiene las propiedades esperadas.');
    }

    return {
      id: backendProd.idProducto,
      code: backendProd.codigoSku,
      name: backendProd.nombre,
      category: backendProd.categoria,
      price: backendProd.precioCompra,
      stock: backendProd.stockActual,
      supplier: backendProd.proveedor?.nombreEmpresa || 'No especificado', // Manejo de proveedor nulo
      description: backendProd.descripcion,
      imageUrl: `https://via.placeholder.com/150/888/FFFFFF?text=${backendProd.nombre.substring(0, 10)}`
    };
  }
  
  /**
   * Un getter que calcula la lista de productos filtrados.
   * Angular lo ejecutará automáticamente cuando 'searchTerm' o 'products' cambien.
   */
  get filteredProducts(): Product[] {
    if (!this.searchTerm.trim()) {
      return this.products; // Devuelve todos si no hay búsqueda
    }

    const lowercasedTerm = this.searchTerm.toLowerCase();

    return this.products.filter(product =>
      product.name.toLowerCase().includes(lowercasedTerm) ||
      product.code.toLowerCase().includes(lowercasedTerm) ||
      product.category.toLowerCase().includes(lowercasedTerm)
    );
  }

  // --- Métodos para calcular las estadísticas (Getters) ---
  get inventoryValue(): number {
    return this.products.reduce((total, product) => total + (product.price * product.stock), 0);
  }

  get lowStockCount(): number {
    return this.products.filter(p => p.stock > 0 && p.stock <= 10).length;
  }

  get outOfStockCount(): number {
    return this.products.filter(p => p.stock === 0).length;
  }
  
  // --- Métodos para controlar la UI (Modal) ---
  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    setTimeout(() => {
      this.selectedProduct = null;
    }, 300); // Espera a que termine la animación de cierre
  }
}