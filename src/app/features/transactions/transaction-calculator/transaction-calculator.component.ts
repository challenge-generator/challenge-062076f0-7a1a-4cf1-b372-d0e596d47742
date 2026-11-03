import { Component, signal, computed, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Transaction, TransactionType } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import {
  CalculationStrategy,
  TotalAmountStrategy,
  FeeCalculationStrategy,
  InterestCalculationStrategy,
  CalculationContext
} from '../../../core/strategies/calculation.strategy';

type CalculationType = 'total' | 'fee' | 'interest';

interface CalculationResult {
  transactionId: string;
  calculationType: CalculationType;
  inputAmount: number;
  result: number;
  timestamp: Date;
  strategyName: string;
}

@Component({
  selector: 'app-transaction-calculator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './transaction-calculator.component.html',
  styleUrls: ['./transaction-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCalculatorComponent {
  readonly selectedTransaction = signal<Transaction | null>(null);
  readonly calculationType = signal<CalculationType>('total');
  readonly customAmount = signal<number>(0);
  readonly calculationResult = signal<CalculationResult | null>(null);
  readonly calculationHistory = signal<CalculationResult[]>([]);
  readonly isCalculating = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly transactions = signal<Transaction[]>([]);

  readonly calculationTypes: { value: CalculationType; label: string }[] = [
    { value: 'total', label: 'Monto Total' },
    { value: 'fee', label: 'Cálculo de Comisiones' },
    { value: 'interest', label: 'Cálculo de Intereses' }
  ];

  readonly currentStrategyName = computed(() => {
    const type = this.calculationType();
    const strategyMap: Record<CalculationType, string> = {
      'total': 'TotalAmountStrategy',
      'fee': 'FeeCalculationStrategy',
      'interest': 'InterestCalculationStrategy'
    };
    return strategyMap[type];
  });

  readonly calculatedAmount = computed(() => {
    const result = this.calculationResult();
    return result ? result.result : 0;
  });

  readonly averageCalculation = computed(() => {
    const history = this.calculationHistory();
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, r) => acc + r.result, 0);
    return sum / history.length;
  });

  readonly maxCalculation = computed(() => {
    const history = this.calculationHistory();
    if (history.length === 0) return 0;
    return Math.max(...history.map(r => r.result));
  });

  readonly minCalculation = computed(() => {
    const history = this.calculationHistory();
    if (history.length === 0) return 0;
    return Math.min(...history.map(r => r.result));
  });

  private readonly calculationContext: CalculationContext;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.calculationContext = new CalculationContext(new TotalAmountStrategy());
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error.set('Error al cargar transacciones');
        this.cdr.markForCheck();
      }
    });
  }

  selectTransaction(transaction: Transaction): void {
    this.selectedTransaction.set(transaction);
    this.customAmount.set(transaction.amount);
    this.calculate();
  }

  onCalculationTypeChange(type: CalculationType): void {
    this.calculationType.set(type);
    this.setStrategyForType(type);
    if (this.selectedTransaction()) {
      this.calculate();
    }
  }

  private setStrategyForType(type: CalculationType): void {
    let strategy: CalculationStrategy;

    switch (type) {
      case 'total':
        strategy = new TotalAmountStrategy();
        break;
      case 'fee':
        strategy = new FeeCalculationStrategy();
        break;
      case 'interest':
        strategy = new InterestCalculationStrategy();
        break;
      default:
        strategy = new TotalAmountStrategy();
    }

    this.calculationContext.setStrategy(strategy);
  }

  calculate(): void {
    const transaction = this.selectedTransaction();
    if (!transaction) {
      this.error.set('Seleccione una transacción');
      return;
    }

    this.isCalculating.set(true);
    this.error.set(null);

    try {
      this.setStrategyForType(this.calculationType());

      const inputAmount = this.customAmount();
      const transactionForCalc = { ...transaction, amount: inputAmount };
      const result = this.calculationContext.executeStrategy(transactionForCalc);

      const calculationResult: CalculationResult = {
        transactionId: transaction.id,
        calculationType: this.calculationType(),
        inputAmount: inputAmount,
        result: result,
        timestamp: new Date(),
        strategyName: this.currentStrategyName()
      };

      this.calculationResult.set(calculationResult);
      this.updateHistory(calculationResult);

    } catch (err) {
      this.error.set('Error al realizar el cálculo');
      console.error('Calculation error:', err);
    } finally {
      this.isCalculating.set(false);
      this.cdr.markForCheck();
    }
  }

  private updateHistory(result: CalculationResult): void {
    this.calculationHistory.update(history => {
      const updated = [result, ...history];
      return updated.slice(0, 20);
    });
  }

  clearHistory(): void {
    this.calculationHistory.set([]);
    this.calculationResult.set(null);
  }

  getStrategyDescription(type: CalculationType): string {
    const descriptions: Record<CalculationType, string> = {
      'total': 'Calcula el monto total de la transacción sin modificaciones.',
      'fee': 'Aplica las comisiones bancarias correspondientes según el tipo de transacción.',
      'interest': 'Calcula los intereses generados según el monto y tipo de transacción.'
    };
    return descriptions[type];
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(date);
  }

  getTransactionTypeLabel(type: TransactionType): string {
    return type === TransactionType.CREDIT ? 'Crédito' : 'Débito';
  }

  trackByCalculation(index: number, item: CalculationResult): string {
    return `${item.transactionId}-${item.timestamp.getTime()}`;
  }
}