import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-filter',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="applyFilter()">
      <select formControlName="type">
        <option value="">Todos</option>
        <option value="Ingreso">Ingreso</option>
        <option value="Gasto">Gasto</option>
      </select>

      <Label>Categoria:</Label>
      <input type="text" formControlName="category">
      <button type="submit">Filtrar</button>

    </form>

    <h4>Resultados del filtro</h4>
    @if(filtered.length > 0){
      <ul>
        @for(t of filtered; track t.id){
          <li>
            {{t.date}} - {{t.type}} - {{t.category}}: S/. {{t.amount}}
          </li>
        }
      </ul>
    }@else {
      <p>No hay transacciones que coincidan con los criterios</p>
    }
  `,
  styleUrl: './transaction-filter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TransactionFilterComponent {
  form: FormGroup;
  fb=inject(FormBuilder);
  service= inject(TransactionService);

  constructor(){
    this.form = this.fb.group({
      type: [''],
      category: [''],
    })
  }


  filtered: Transaction[] = this.service.transactions();

  applyFilter():void{
    this.filtered = this.service.filter({
      type: this.form.value.type || undefined,
      category: this.form.value.category || undefined

      });
  }
 }
