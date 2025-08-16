import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConectionModal } from './conection-modal';

describe('ConectionModal', () => {
  let component: ConectionModal;
  let fixture: ComponentFixture<ConectionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConectionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConectionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
