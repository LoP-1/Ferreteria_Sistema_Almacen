import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOutList } from './warehouse-out-list';

describe('WarehouseOutList', () => {
  let component: WarehouseOutList;
  let fixture: ComponentFixture<WarehouseOutList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseOutList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseOutList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
