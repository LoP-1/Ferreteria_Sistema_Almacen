import { Routes } from '@angular/router';

// Import the standalone components
import { ProductList } from './components/product-list/product-list';
import { ProductForm } from './components/product-form/product-form';

// Export the routes array
export const PRODUCTS_ROUTES: Routes = [
  {
    path: '', // Default route for this module (/dashboard/products)
    component: ProductList
  },
  {
    path: 'new', // Route for adding a new product (/dashboard/products/new)
    component: ProductForm
  },
  {
    path: 'edit/:id', // Route for editing an existing product (/dashboard/products/edit/1)
    component: ProductForm
  }
];