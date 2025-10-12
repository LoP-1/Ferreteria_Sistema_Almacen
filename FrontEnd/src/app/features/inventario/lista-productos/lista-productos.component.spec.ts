import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosComponent } from './lista-productos.component'; // <-- Corregido

describe('ListaProductosComponent', () => { // <-- Corregido
  let component: ListaProductosComponent; // <-- Corregido
  let fixture: ComponentFixture<ListaProductosComponent>; // <-- Corregido

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProductosComponent] // <-- Corregido
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaProductosComponent); // <-- Corregido
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});