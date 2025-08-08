import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPage } from './work.page';

describe('WorkPage', () => {
  let component: WorkPage;
  let fixture: ComponentFixture<WorkPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
