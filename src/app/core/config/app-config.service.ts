import { Injectable, Signal, computed, signal } from '@angular/core';
import { AppConfig } from './app-config.model';

/**
 * Servicio Singleton que gestiona la configuración global de la aplicación.
 * Implementa el patrón Singleton mediante el decorador @Injectable con providedIn: 'root'.
 * Proporciona métodos para leer y actualizar la configuración de manera reactiva.
 */
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private readonly _config = signal<AppConfig>({
    currency: 'USD',
    decimalPlaces: 2,
    transactionLimit: 10000,
    maintenanceMode: false,
    apiEndpoint: 'https://api.banking.example.com/v1'
  });

  /**
   * Señal reactiva que expone la configuración actual.
   * Permite a los componentes reaccionar a cambios en la configuración.
   */
  public config: Signal<AppConfig> = computed(() => this._config());

  /**
   * Actualiza la configuración global.
   * @param newConfig Objeto con los valores de configuración a actualizar.
   */
  updateConfig(newConfig: Partial<AppConfig>): void {
    this._config.update(current => ({ ...current, ...newConfig }));
  }

  /**
   * Obtiene el símbolo de la moneda configurada.
   * @returns Símbolo de la moneda (ej: '$' para USD).
   */
  getCurrencySymbol(): string {
    return this.getCurrencySymbolForCode(this._config().currency);
  }

  /**
   * Convierte un código de moneda a su símbolo.
   * @param code Código de moneda (ej: 'USD', 'EUR').
   * @returns Símbolo de la moneda.
   */
  private getCurrencySymbolForCode(code: string): string {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥'
    };
    return symbols[code] || code;
  }
}