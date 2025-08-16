import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bracers } from './bracers';

describe('Bracers', () => {
  let component: Bracers;
  let fixture: ComponentFixture<Bracers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bracers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bracers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
