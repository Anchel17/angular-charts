import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDoughnutComponent } from './grafico-doughnut.component';

describe('GraficoPieComponent', () => {
  let component: GraficoDoughnutComponent;
  let fixture: ComponentFixture<GraficoDoughnutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficoDoughnutComponent]
    });
    fixture = TestBed.createComponent(GraficoDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
