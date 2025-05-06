import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoPieComponent } from './grafico-pie.component';

describe('GraficoPieComponent', () => {
  let component: GraficoPieComponent;
  let fixture: ComponentFixture<GraficoPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoPieComponent]
    });
    fixture = TestBed.createComponent(GraficoPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
