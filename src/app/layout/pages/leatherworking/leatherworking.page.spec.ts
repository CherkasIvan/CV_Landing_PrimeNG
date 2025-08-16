import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leatherworking } from './leatherworking';

describe('Leatherworking', () => {
  let component: Leatherworking;
  let fixture: ComponentFixture<Leatherworking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leatherworking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Leatherworking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
