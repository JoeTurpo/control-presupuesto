import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { TransactionService } from '../../services/transaction.service';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-transaction-graphic-report',
  imports: [CommonModule],
  template: `
    <h2>Reporte Gráfico de Transacciones</h2>
    <p>Este gráfico muestra la cantidad de transacciones por tipo (Ingreso/Gasto).</p>
    <canvas #chartCanvas></canvas>

  `,
  styleUrl: './transaction-graphic-report.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TransactionGraphicReportComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private service: TransactionService) {}

  ngAfterViewInit() {
    const transactions = this.service.transactions();
    const ingreso = transactions.filter(t => t.type === 'Ingreso').length;
    const gasto = transactions.filter(t => t.type === 'Gasto').length;

    new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ingreso', 'Gasto'],
        datasets: [{
          label: 'Total',
          data: [ingreso, gasto],
          backgroundColor: ['#4caf50', '#f44336'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Transacciones por tipo' }
        }
      }
    });
  }
}
