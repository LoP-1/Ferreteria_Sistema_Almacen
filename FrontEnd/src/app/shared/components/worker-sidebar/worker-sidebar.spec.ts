import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSidebar } from './worker-sidebar';

describe('WorkerSidebar', () => {
  let component: WorkerSidebar;
  let fixture: ComponentFixture<WorkerSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
