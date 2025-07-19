export interface Transaction {
    id: number;
    type: 'Ingreso' | 'Gasto';
    amount: number;
    category: string;
    description?: string;
    date: string
}

