import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotoDisplayComponent } from './piloto-display.component';

describe('PilotoDisplayComponent', () => {
  let component: PilotoDisplayComponent;
  let fixture: ComponentFixture<PilotoDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PilotoDisplayComponent]
    });
    fixture = TestBed.createComponent(PilotoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
