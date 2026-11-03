import { Routes } from '@angular/router';
import { TransactionListComponent } from './features/transactions/transaction-list/transaction-list.component';
import { TransactionCalculatorComponent } from './features/transactions/transaction-calculator/transaction-calculator.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'transactions',
    pathMatch: 'full'
  },
  {
    path: 'transactions',
    component: TransactionListComponent,
    title: 'Transacciones - Banking App',
    data: {
      breadcrumb: 'Transacciones',
      requiredRole: 'user'
    }
  },
  {
    path: 'transactions/:id',
    component: TransactionListComponent,
    title: 'Detalle de Transacción',
    data: {
      breadcrumb: 'Detalle',
      requiredRole: 'user'
    }
  },
  {
    path: 'calculator',
    component: TransactionCalculatorComponent,
    title: 'Calculadora - Banking App',
    data: {
      breadcrumb: 'Calculadora',
      requiredRole: 'user'
    }
  },
  {
    path: 'calculator/:type',
    component: TransactionCalculatorComponent,
    title: 'Calculadora de Comisiones',
    data: {
      breadcrumb: 'Cálculo',
      requiredRole: 'user'
    }
  },
  {
    path: '**',
    redirectTo: 'transactions'
  }
];