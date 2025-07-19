import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-form',
  imports: [ReactiveFormsModule],
  template: `
  <form [formGroup]="form" (ngSubmit)="save()">
      <label>Tipo:</label>
      <select formControlName="type">
        <option value="Ingreso">Ingreso</option>
        <option value="Gasto">Gasto</option>
      </select>

      <label>Monto</label>
      <input type="number" formControlName="amount">
      @if(form.get('amount')?.invalid && form.get('amount')?.touched){
        <small>Monto requerido y debe ser positivo</small>
      }

      <label>Categoria</label>
      <input type="text" formControlName="category">
      @if(form.get('category')?.invalid && form.get('category')?.touched){
        <small>La categoria es obligatoria</small>
      }

      <label>Descripcion</label>
      <input type="text" formControlName="description">

      <label>Fecha</label>
      <input type="date" formControlName="date">
      @if(form.get('date')?.invalid && form.get('date')?.touched){
        <small>La fecha es obligatoria</small>
      }

      <button type="submit" [disabled]="form.invalid">Registrar</button>
  </form>
  `,
  styleUrl: './transaction-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent {
  form: FormGroup;
  fb=inject(FormBuilder);
  servie= inject(TransactionService);

  constructor(){
    this.form = this.fb.group({
      type: ['Ingreso', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      description: [''],
      date: ['', Validators.required]
    })
  }


  save(){
    if(this.form.valid){
      const transaction: Transaction ={
        id: Date.now().toString(),
        ...this.form.value
      };
      this.servie.add(transaction);
      this.form.reset({type: 'Ingreso', amount: 0, date: ''});

    }
  }





 }
