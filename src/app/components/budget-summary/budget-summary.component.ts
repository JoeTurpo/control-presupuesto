import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';


@Component({
  selector: 'app-budget-summary',
  imports: [],
  template: `
    <section>
      <h3>Resumen financiero</h3>
      <p>Total ingresos: S/. {{totalIngreso()}}</p>
      <p>Total gastos: S/. {{totalGasto()}}</p>
      <p>Balance: S/. {{balance()}}</p>
    </section>
  `,
  styleUrl: './budget-summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetSummaryComponent {

  service = inject(TransactionService);

  totalIngreso = computed(() => {
    return this.service.transactions().filter(t=> t.type === 'Ingreso')
      .reduce((sum,t)=>sum+t.amount,0)


  })


  totalGasto = computed(() => {
    return this.service.transactions().filter(t=> t.type === 'Gasto')
      .reduce((sum,t)=>sum+t.amount,0)


  })

  balance = computed(() => this.totalIngreso() - this.totalGasto());
 }
