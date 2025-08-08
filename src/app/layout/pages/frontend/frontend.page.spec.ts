import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontendPage } from './frontend.page';

describe('FrontendPage', () => {
  let component: FrontendPage;
  let fixture: ComponentFixture<FrontendPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrontendPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
