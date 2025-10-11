import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutComponent } from './admin-layout.component'; // <-- Corregido

describe('AdminLayoutComponent', () => { // <-- Corregido
  let component: AdminLayoutComponent; // <-- Corregido
  let fixture: ComponentFixture<AdminLayoutComponent>; // <-- Corregido

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutComponent] // <-- Corregido
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminLayoutComponent); // <-- Corregido
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});