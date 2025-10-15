import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOutForm } from './warehouse-out-form';

describe('WarehouseOutForm', () => {
  let component: WarehouseOutForm;
  let fixture: ComponentFixture<WarehouseOutForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseOutForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseOutForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
