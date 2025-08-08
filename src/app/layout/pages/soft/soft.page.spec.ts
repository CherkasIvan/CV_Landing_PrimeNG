import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftPage } from './soft.page';

describe('SoftPage', () => {
  let component: SoftPage;
  let fixture: ComponentFixture<SoftPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
