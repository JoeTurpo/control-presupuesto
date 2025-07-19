import { ChangeDetectionStrategy, Component, AfterViewInit, ViewChild, ElementRef, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, LineElement, PointElement } from 'chart.js';
import { TransactionService } from '../../services/transaction.service';

Chart.register(
  BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend,
  LineController, LineElement, PointElement
);

@Component({
  selector: 'app-transaction-graphic-report',
  imports: [CommonModule],
  template: `
    <h2>Reporte Gráfico de Transacciones</h2>
    <p>Este gráfico muestra el monto total por tipo (Ingreso/Gasto).</p>
    <canvas #chartCanvas></canvas>
    <h3>Montos por fecha y tipo</h3>
    <canvas #lineChartCanvas></canvas>
  `,
  styleUrl: './transaction-graphic-report.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TransactionGraphicReportComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineChartCanvas', { static: true }) lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  barChart!: Chart;
  lineChart!: Chart;
  service = inject(TransactionService);

  ngAfterViewInit() {

    const transactions = this.service.transactions();
//    const ingreso = transactions.filter(t => t.type === 'Ingreso').length;
//    const gasto = transactions.filter(t => t.type === 'Gasto').length;
    const ingreso = transactions.filter(t => t.type === 'Ingreso').reduce((sum, t) => sum + t.amount, 0);
    const gasto = transactions.filter(t => t.type === 'Gasto').reduce((sum, t) => sum + t.amount, 0);
    this.barChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ingreso', 'Gasto'],
        datasets: [{
          label: 'Total S/.',
          data: [ingreso, gasto],
          backgroundColor: ['#4caf50', '#f44336'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Montos por tipo de transacción' }
        }
      }
    });



    const fechasUnicas = Array.from(new Set(transactions.map(t => t.date))).sort();
    const ingresoPorFecha = fechasUnicas.map(date =>
      transactions.filter(t => t.type === 'Ingreso' && t.date === date)
        .reduce((sum, t) => sum + t.amount, 0)
    );
    const gastoPorFecha = fechasUnicas.map(date =>
      transactions.filter(t => t.type === 'Gasto' && t.date === date)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    this.lineChart = new Chart(this.lineChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: fechasUnicas,
        datasets: [
          {
            label: 'Ingreso',
            data: ingresoPorFecha,
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: false,
            tension: 0.1
          },
          {
            label: 'Gasto',
            data: gastoPorFecha,
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            fill: false,
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Montos por fecha y tipo de transacción' }
        },
        scales: {
          x: { title: { display: true, text: 'Fecha' } },
          y: { title: { display: true, text: 'Monto S/.' } }
        }
      }
    });


  }

}
