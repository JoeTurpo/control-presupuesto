import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';


@Component({
  selector: 'app-transaction-list',
  imports: [],
  template: `
    <h3>Transacciones Registradas</h3>
    @if(transactions().length >0){
      <ul>
        @for(t of transactions(); track t.id){
          <li>
            {{t.date}} - {{t.type}} - {{t.category}}:  S/. {{t.amount}}
          </li>
        }
      </ul>
    }@else {
      <p>No hay transacciones registradas.</p>
    }
  `,
  styleUrl: './transaction-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent {
  service = inject(TransactionService);
  transactions = this.service.transactions;





 }
