import { Transaction } from './../models/transaction';
import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private _transactions= signal<Transaction[]>(this.loadFromLocalStorage());
  transactions = this._transactions.asReadonly();

  add(transaction: Transaction): void{
    const updated =[...this._transactions(), transaction];
    this._transactions.set(updated);
    this.saveToLocalStorage(updated);
  }

  private saveToLocalStorage(data: Transaction[]): void {
    localStorage.setItem('budget-transactions', JSON.stringify(data));
  }


  private loadFromLocalStorage(): Transaction[] {
    const data = localStorage.getItem('budget-transactions');
    return data ? JSON.parse(data) : [];
  }

  filter(criteria:{type?: string; category?: string}): Transaction[] {
    return this._transactions().filter(t=> (!criteria.type || t.type === criteria.type) &&
       (!criteria.category || t.category.toLowerCase().includes(criteria.category.toLowerCase()))
      );
  }

  constructor() { }

}
