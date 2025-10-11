import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerLayoutComponent } from './worker-layout.component'; // <-- Corregido aquí

describe('WorkerLayoutComponent', () => { // <-- Corregido aquí
  let component: WorkerLayoutComponent; // <-- Corregido aquí
  let fixture: ComponentFixture<WorkerLayoutComponent>; // <-- Corregido aquí

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerLayoutComponent] // <-- Corregido aquí
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerLayoutComponent); // <-- Corregido aquí
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});