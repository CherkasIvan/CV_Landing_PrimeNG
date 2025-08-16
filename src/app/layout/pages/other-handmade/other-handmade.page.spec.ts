import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherHandmade } from './other-handmade';

describe('OtherHandmade', () => {
  let component: OtherHandmade;
  let fixture: ComponentFixture<OtherHandmade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherHandmade]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherHandmade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
