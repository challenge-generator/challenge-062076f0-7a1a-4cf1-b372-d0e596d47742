import { Transaction } from '../../features/transactions/transaction.model';

/**
 * Interfaz que define el contrato para estrategias de cálculo financiero.
 * Implementa el patrón Strategy permitiendo diferentes algoritmos de cálculo.
 */
export interface CalculationStrategy {
  /**
   * Calcula el resultado financiero basado en una transacción.
   * @param transaction Transacción sobre la cual realizar el cálculo.
   * @returns Resultado del cálculo como número.
   */
  calculate(transaction: Transaction): number;
}

/**
 * Estrategia que calcula el importe total de una transacción incluyendo impuestos.
 */
export class TotalAmountStrategy implements CalculationStrategy {
  calculate(transaction: Transaction): number {
    const taxRate = 0.21; // 21% de IVA
    return transaction.amount * (1 + taxRate);
  }
}

/**
 * Estrategia que calcula la comisión por transacción.
 */
export class FeeCalculationStrategy implements CalculationStrategy {
  calculate(transaction: Transaction): number {
    // Comisión fija de 1.50 + 0.5% del importe
    return 1.5 + (transaction.amount * 0.005);
  }
}

/**
 * Estrategia que calcula el interés acumulado para transacciones de tipo "deposit".
 */
export class InterestCalculationStrategy implements CalculationStrategy {
  calculate(transaction: Transaction): number {
    if (transaction.type !== 'deposit') {
      return 0;
    }
    // Interés del 2% anual (simplificado)
    return transaction.amount * 0.02;
  }
}

/**
 * Contexto que utiliza una estrategia de cálculo.
 * Permite cambiar la estrategia dinámicamente.
 */
export class CalculationContext {
  private strategy: CalculationStrategy;

  /**
   * Inicializa el contexto con una estrategia por defecto.
   * @param strategy Estrategia inicial (opcional).
   */
  constructor(strategy?: CalculationStrategy) {
    this.strategy = strategy || new TotalAmountStrategy();
  }

  /**
   * Establece una nueva estrategia de cálculo.
   * @param strategy Nueva estrategia a utilizar.
   */
  setStrategy(strategy: CalculationStrategy): void {
    this.strategy = strategy;
  }

  /**
   * Ejecuta el cálculo utilizando la estrategia actual.
   * @param transaction Transacción sobre la cual realizar el cálculo.
   * @returns Resultado del cálculo.
   */
  executeStrategy(transaction: Transaction): number {
    return this.strategy.calculate(transaction);
  }
}