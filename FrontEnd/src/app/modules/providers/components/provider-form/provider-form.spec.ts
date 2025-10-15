import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderForm } from './provider-form';

describe('ProviderForm', () => {
  let component: ProviderForm;
  let fixture: ComponentFixture<ProviderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
