import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionTemplate } from './description-template';

describe('DescriptionTemplate', () => {
  let component: DescriptionTemplate;
  let fixture: ComponentFixture<DescriptionTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
