import { Component, signal } from '@angular/core';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFilterComponent } from './components/transaction-filter/transaction-filter.component';
import { BudgetSummaryComponent } from './components/budget-summary/budget-summary.component';

@Component({
  selector: 'app-root',
  imports: [TransactionFormComponent, TransactionListComponent, TransactionFilterComponent, BudgetSummaryComponent],
  template: `
    <app-transaction-form></app-transaction-form>
    <app-transaction-list></app-transaction-list>
    <app-transaction-filter></app-transaction-filter>
    <app-budget-summary></app-budget-summary>
  `,

  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('control-presupuesto');
}
