import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesPage } from './technologies.page';

describe('TechnologiesPage', () => {
  let component: TechnologiesPage;
  let fixture: ComponentFixture<TechnologiesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologiesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
