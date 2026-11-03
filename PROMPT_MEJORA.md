# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/features/transactions/transaction-list/transaction-list.component.ts` — `TransactionEvent.unshift`: Se invoca `unshift` sobre `TransactionEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/transactions/transaction-list/transaction-list.component.ts` — `TransactionEvent.pop`: Se invoca `pop` sobre `TransactionEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/transactions/transaction-calculator/transaction-calculator.component.ts` — `CalculationType.set`: Se invoca `set` sobre `CalculationType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/transactions/transaction-calculator/transaction-calculator.component.ts` — `CalculationResult.set`: Se invoca `set` sobre `CalculationResult`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior

### Brecha de conocimiento
Aplica conscientemente al menos 3 patrones de diseño (Gang of four patterns) aplicados a frontend. El objetivo es que domines la aplicación de patrones como Singleton, Observer, Strategy, Factory, Decorator y otros en contextos de desarrollo frontend real, mejorando la arquitectura y mantenibilidad del código.

### Misión / candidato
Candidato con experiencia Senior en Frontend, buscando fortalecer habilidades de diseño de software en proyectos Angular.

### Reto
- Tema: Patrones de diseño GOF aplicados a frontend
- Seniority: senior-l2
- Tipo: practical
- Título: Aplicación de Patrones de Diseño en Proyecto Angular
- Tiempo estimado: 20 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Implementación del Patrón Singleton — objetivo: Aplicar el patrón Singleton para gestionar un servicio de configuración global en la aplicación Angular. — entregable (NO resolver): Servicio de configuración global implementado con el patrón Singleton y accesible en la aplicación Angular.
- Fase 2: Aplicación del Patrón Observer — objetivo: Utilizar el patrón Observer para manejar eventos de actualización en la aplicación Angular. — entregable (NO resolver): Componente que utiliza el patrón Observer para actualizarse en respuesta a cambios en el estado de la aplicación.
- Fase 3: Integración del Patrón Strategy — objetivo: Incorporar el patrón Strategy para gestionar diferentes algoritmos de cálculo en la aplicación Angular. — entregable (NO resolver): Funcionalidad que utiliza el patrón Strategy para seleccionar y aplicar diferentes algoritmos de cálculo.
- Fase 4: Refactorización y Optimización — objetivo: Refactorizar el código para mejorar la legibilidad, mantenibilidad y rendimiento, aplicando los patrones de diseño aprendidos. — entregable (NO resolver): Código refactorizado que aplica los patrones de diseño aprendidos, mejorando la legibilidad, mantenibilidad y rendimiento de la aplicación.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "angular-banking-transactions",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "20.0.0",
    "@angular/cdk": "17.0.0",
    "@angular/common": "20.0.0",
    "@angular/compiler": "20.0.0",
    "@angular/core": "20.0.0",
    "@angular/forms": "20.0.0",
    "@angular/material": "17.0.0",
    "@angular/platform-browser": "20.0.0",
    "@angular/platform-browser-dynamic": "20.0.0",
    "@angular/router": "20.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.6.2",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular-eslint/eslint-plugin": "17.0.0",
    "@angular/cli": "~20.0.0",
    "@angular/compiler-cli": "20.0.0",
    "@types/jest": "29.5.12",
    "@types/node": "20.11.19",
    "eslint": "^8.56.0",
    "jest": "29.7.0",
    "jest-preset-angular": "13.1.0",
    "typescript": "5.3.3"
  },
  "jest": {
    "preset": "jest-preset-angular",
    "setupFilesAfterEnv": ["<rootDir>/setup-jest.ts"],
    "globalSetup": "jest-preset-angular/global-setup"
  }
}

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "angular-banking-transactions": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:application": {
          "standalone": true,
          "strict": true,
          "style": "scss"
        },
        "@schematics/angular:component": {
          "standalone": true,
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/angular-banking-transactions",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "outputHashing": "all",
              "sourceMap": true,
              "namedChunks": true,
              "extractLicenses": false,
              "vendorChunk": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "browserTarget": "angular-banking-transactions:build:production"
            },
            "development": {
              "browserTarget": "angular-banking-transactions:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "angular-banking-transactions:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:jest",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-eslint/builder:lint",
          "options": {
            "lintFilePatterns": [
              "src/**/*.ts",
              "src/**/*.html"
            ]
          }
        }
      }
    }
  },
  "defaultProject": "angular-banking-transactions",
  "cli": {
    "analytics": false
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom",
      "dom.iterable"
    ],
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"],
      "@env": ["src/environments/environment"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: src/app/core/config/app-config.service.ts ===
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

// === ARCHIVO: src/app/core/observers/transaction.observer.ts ===
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Transaction } from '../../features/transactions/transaction.model';

/**
 * Tipos de eventos que pueden ser notificados a través del TransactionObserver.
 */
export type TransactionEventType = 'created' | 'updated' | 'deleted' | 'error';

/**
 * Estructura de un evento de transacción.
 */
export interface TransactionEvent {
  type: TransactionEventType;
  transaction: Transaction;
  timestamp: Date;
}

/**
 * Servicio que implementa el patrón Observer para notificar cambios en transacciones.
 * Permite a los componentes suscribirse a eventos de transacciones y reaccionar en consecuencia.
 */
@Injectable({
  providedIn: 'root'
})
export class TransactionObserver {
  private readonly _events = new Subject<TransactionEvent>();

  /**
   * Observable de eventos de transacciones.
   * Los componentes pueden suscribirse para recibir notificaciones.
   */
  readonly events$: Observable<TransactionEvent> = this._events.asObservable();

  /**
   * Notifica un evento de transacción a todos los suscriptores.
   * @param event Evento de transacción a notificar.
   */
  notify(event: TransactionEvent): void {
    this._events.next({
      ...event,
      timestamp: event.timestamp || new Date()
    });
  }

  /**
   * Notifica la creación de una nueva transacción.
   * @param transaction Transacción recién creada.
   */
  notifyCreated(transaction: Transaction): void {
    this.notify({
      type: 'created',
      transaction,
      timestamp: new Date()
    });
  }

  /**
   * Notifica la actualización de una transacción existente.
   * @param transaction Transacción actualizada.
   */
  notifyUpdated(transaction: Transaction): void {
    this.notify({
      type: 'updated',
      transaction,
      timestamp: new Date()
    });
  }

  /**
   * Notifica la eliminación de una transacción.
   * @param transactionId ID de la transacción eliminada.
   */
  notifyDeleted(transactionId: string): void {
    this.notify({
      type: 'deleted',
      transaction: { id: transactionId } as Transaction,
      timestamp: new Date()
    });
  }

  /**
   * Notifica un error relacionado con una transacción.
   * @param transaction Transacción asociada al error.
   * @param error Mensaje de error.
   */
  notifyError(transaction: Transaction, error: string): void {
    this.notify({
      type: 'error',
      transaction,
      timestamp: new Date()
    });
  }
}

// === ARCHIVO: src/app/core/strategies/calculation.strategy.ts ===
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

// === ARCHIVO: src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Error al iniciar la aplicación Angular:', err));

// === ARCHIVO: src/styles.scss ===
@use '@angular/material' as mat;

$primary-palette: mat.m2-define-palette(mat.$m2-indigo-palette);
$accent-palette: mat.m2-define-palette(mat.$m2-teal-palette, A200, A100, A400);
$warn-palette: mat.m2-define-palette(mat.$m2-red-palette);

$theme: mat.m2-define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
    warn: $warn-palette,
  ),
  typography: mat.m2-define-typography-config(),
  density: 0,
));

@include mat.core();
@include mat.all-component-themes($theme);

:root {
  --color-primary: #3f51b5;
  --color-primary-dark: #303f9f;
  --color-primary-light: #c5cae9;
  --color-accent: #009688;
  --color-accent-light: #b2dfdb;
  --color-warn: #f44336;
  --color-success: #4caf50;
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-text-primary: rgba(0, 0, 0, 0.87);
  --color-text-secondary: rgba(0, 0, 0, 0.6);
  --color-text-disabled: rgba(0, 0, 0, 0.38);
  --border-color: rgba(0, 0, 0, 0.12);
  --shadow-elevation-1: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  --shadow-elevation-2: 0 3px 6px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
  --shadow-elevation-3: 0 10px 20px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1);
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 400ms ease-in-out;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  width: 100%;
  font-family: 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text-primary);
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-primary-dark);
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

input,
textarea,
select {
  font-family: inherit;
  font-size: inherit;

  &:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: -1px;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

h1 {
  font-size: 2.5rem;
  letter-spacing: -0.5px;
}

h2 {
  font-size: 2rem;
  letter-spacing: -0.25px;
}

h3 {
  font-size: 1.75rem;
}

h4 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

h6 {
  font-size: 1rem;
  font-weight: 500;
}

p {
  margin-bottom: var(--spacing-md);
  color: var(--color-text-secondary);
}

.text-primary {
  color: var(--color-text-primary);
}

.text-secondary {
  color: var(--color-text-secondary);
}

.text-disabled {
  color: var(--color-text-disabled);
}

.text-accent {
  color: var(--color-accent);
}

.text-warn {
  color: var(--color-warn);
}

.text-success {
  color: var(--color-success);
}

.bg-primary {
  background-color: var(--color-primary);
  color: white;
}

.bg-surface {
  background-color: var(--color-surface);
}

.bg-background {
  background-color: var(--color-background);
}

.card {
  background: var(--color-surface);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-elevation-1);
  padding: var(--spacing-lg);
  transition: box-shadow var(--transition-normal);

  &:hover {
    box-shadow: var(--shadow-elevation-2);
  }

  &.elevated {
    box-shadow: var(--shadow-elevation-2);

    &:hover {
      box-shadow: var(--shadow-elevation-3);
    }
  }
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-sm {
  gap: var(--spacing-sm);
}

.gap-md {
  gap: var(--spacing-md);
}

.gap-lg {
  gap: var(--spacing-lg);
}

.mt-sm {
  margin-top: var(--spacing-sm);
}

.mt-md {
  margin-top: var(--spacing-md);
}

.mt-lg {
  margin-top: var(--spacing-lg);
}

.mb-sm {
  margin-bottom: var(--spacing-sm);
}

.mb-md {
  margin-bottom: var(--spacing-md);
}

.mb-lg {
  margin-bottom: var(--spacing-lg);
}

.p-sm {
  padding: var(--spacing-sm);
}

.p-md {
  padding: var(--spacing-md);
}

.p-lg {
  padding: var(--spacing-lg);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in {
  animation: fadeIn var(--transition-normal) forwards;
}

.animate-slide-up {
  animation: slideInUp var(--transition-normal) forwards;
}

.animate-slide-left {
  animation: slideInLeft var(--transition-normal) forwards;
}

.mat-mdc-card {
  background: var(--color-surface) !important;
  border-radius: var(--border-radius-md) !important;
}

.mat-mdc-raised-button,
.mat-mdc-flat-button {
  border-radius: var(--border-radius-sm) !important;
  font-weight: 500 !important;
  letter-spacing: 0.5px !important;
}

.mat-mdc-form-field {
  width: 100%;
}

.mat-mdc-snack-bar-container {
  border-radius: var(--border-radius-md) !important;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-background);
}

::-webkit-scrollbar-thumb {
  background: var(--color-text-disabled);
  border-radius: 4px;

  &:hover {
    background: var(--color-text-secondary);
  }
}

::selection {
  background-color: var(--color-primary-light);
  color: var(--color-text-primary);
}

@media (max-width: 599px) {
  html {
    font-size: 14px;
  }

  .container {
    padding: 0 var(--spacing-sm);
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }
}

@media (min-width: 600px) and (max-width: 959px) {
  .container {
    max-width: 900px;
  }
}

@media (min-width: 960px) and (max-width: 1279px) {
  .container {
    max-width: 1100px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1400px;
  }
}

// === ARCHIVO: src/index.html ===
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Angular Banking Transactions - Aplicación de Patrones de Diseño GOF</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Aplicación Angular que gestiona transacciones financieras aplicando patrones de diseño GOF: Singleton, Observer y Strategy">
  <meta name="keywords" content="Angular, Patrones de Diseño, Singleton, Observer, Strategy, GOF, Transactions, Banking">
  <meta name="author" content="Desarrollador Senior Frontend">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="Angular Banking Transactions">
  <meta property="og:description" content="Gestión de transacciones financieras con patrones de diseño GOF">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root>
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; gap: 16px;">
      <div style="width: 48px; height: 48px; border: 4px solid #3f51b5; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
      <p style="color: #666; font-family: Roboto, sans-serif;">Cargando aplicación Angular...</p>
    </div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </app-root>
  <noscript>
    <div style="padding: 20px; text-align: center; font-family: Arial, sans-serif;">
      <h1>JavaScript requerido</h1>
      <p>Esta aplicación requiere JavaScript para funcionar. Por favor, habilite JavaScript en su navegador.</p>
    </div>
  </noscript>
</body>
</html>

// === ARCHIVO: src/app/core/config/app-config.model.ts ===
export interface AppConfigFeatures {
  enableNotifications: boolean;
  enableDarkMode: boolean;
  enableAnalytics: boolean;
  enableExperimentalFeatures: boolean;
  maxTransactionHistory: number;
  defaultPageSize: number;
}

export interface AppConfig {
  currency: string;
  currencySymbol: string;
  locale: string;
  language: string;
  theme: 'light' | 'dark' | 'auto';
  apiUrl: string;
  apiTimeout: number;
  retryAttempts: number;
  features: AppConfigFeatures;
  dateFormat: string;
  timeFormat: string;
  decimalSeparator: string;
  thousandsSeparator: string;
}

export const DEFAULT_APP_CONFIG: AppConfig = {
  currency: 'USD',
  currencySymbol: '$',
  locale: 'en-US',
  language: 'en',
  theme: 'light',
  apiUrl: '/api',
  apiTimeout: 30000,
  retryAttempts: 3,
  features: {
    enableNotifications: true,
    enableDarkMode: true,
    enableAnalytics: false,
    enableExperimentalFeatures: false,
    maxTransactionHistory: 100,
    defaultPageSize: 10
  },
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'HH:mm',
  decimalSeparator: '.',
  thousandsSeparator: ','
};

export type ThemeMode = 'light' | 'dark' | 'auto';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'ARS';

// === ARCHIVO: src/app/app.config.ts ===
import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { AppConfigService } from './core/config/app-config.service';
import { TransactionObserver } from './core/observers/transaction.observer';
import { CalculationContext, TotalAmountStrategy, FeeCalculationStrategy, InterestCalculationStrategy } from './core/strategies/calculation.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideAnimations(),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: AppConfigService,
      useClass: AppConfigService
    },
    {
      provide: TransactionObserver,
      useClass: TransactionObserver
    },
    {
      provide: CalculationContext,
      useFactory: () => {
        const context = new CalculationContext(new TotalAmountStrategy());
        return context;
      }
    },
    {
      provide: 'CALCULATION_STRATEGIES',
      useValue: {
        total: TotalAmountStrategy,
        fee: FeeCalculationStrategy,
        interest: InterestCalculationStrategy
      }
    },
    {
      provide: 'APP_FEATURES',
      useValue: {
        enableNotifications: true,
        enableDarkMode: true,
        enableAnalytics: false,
        maxTransactionHistory: 100
      }
    },
    {
      provide: 'API_CONFIG',
      useValue: {
        baseUrl: '/api/v1',
        timeout: 30000,
        retryAttempts: 3,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
  ]
};

// === ARCHIVO: src/app/app.routes.ts ===
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

// === ARCHIVO: src/app/features/transactions/transaction.service.ts ===
import { Injectable, signal, computed } from '@angular/core';
import { Observable, BehaviorSubject, of, delay, map, catchError, tap } from 'rxjs';
import { Transaction, TransactionStatus, TransactionType } from './transaction.model';
import { TransactionObserver, TransactionEvent, TransactionEventType } from '../../core/observers/transaction.observer';
import { AppConfigService } from '../../core/config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly transactions$ = new BehaviorSubject<Transaction[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  private readonly error$ = new BehaviorSubject<string | null>(null);

  readonly transactions = signal<Transaction[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  readonly transactionCount = computed(() => this.transactions().length);
  readonly totalBalance = computed(() => 
    this.transactions().reduce((sum, t) => {
      const amount = t.type === TransactionType.CREDIT ? t.amount : -t.amount;
      return sum + amount;
    }, 0)
  );

  constructor(
    private readonly transactionObserver: TransactionObserver,
    private readonly appConfig: AppConfigService
  ) {
    this.loadInitialTransactions();
  }

  private loadInitialTransactions(): void {
    const mockTransactions: Transaction[] = [
      {
        id: 'txn-001',
        accountId: 'acc-12345',
        type: TransactionType.CREDIT,
        amount: 1500.00,
        currency: 'USD',
        status: TransactionStatus.COMPLETED,
        description: 'Depósito de nómina',
        createdAt: new Date('2024-01-15T09:00:00Z'),
        updatedAt: new Date('2024-01-15T09:00:00Z'),
        category: 'income'
      },
      {
        id: 'txn-002',
        accountId: 'acc-12345',
        type: TransactionType.DEBIT,
        amount: 250.50,
        currency: 'USD',
        status: TransactionStatus.COMPLETED,
        description: 'Compra en supermercado',
        createdAt: new Date('2024-01-16T14:30:00Z'),
        updatedAt: new Date('2024-01-16T14:30:00Z'),
        category: 'shopping'
      },
      {
        id: 'txn-003',
        accountId: 'acc-12345',
        type: TransactionType.DEBIT,
        amount: 120.00,
        currency: 'USD',
        status: TransactionStatus.PENDING,
        description: 'Pago de servicios',
        createdAt: new Date('2024-01-17T10:00:00Z'),
        updatedAt: new Date('2024-01-17T10:00:00Z'),
        category: 'utilities'
      },
      {
        id: 'txn-004',
        accountId: 'acc-12345',
        type: TransactionType.CREDIT,
        amount: 3500.00,
        currency: 'USD',
        status: TransactionStatus.COMPLETED,
        description: 'Transferencia recibida',
        createdAt: new Date('2024-01-18T16:45:00Z'),
        updatedAt: new Date('2024-01-18T16:45:00Z'),
        category: 'transfer'
      },
      {
        id: 'txn-005',
        accountId: 'acc-12345',
        type: TransactionType.DEBIT,
        amount: 89.99,
        currency: 'USD',
        status: TransactionStatus.FAILED,
        description: 'Pago rechazado',
        createdAt: new Date('2024-01-19T11:20:00Z'),
        updatedAt: new Date('2024-01-19T11:25:00Z'),
        category: 'other'
      }
    ];

    this.transactions$.next(mockTransactions);
    this.transactions.set(mockTransactions);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactions$.asObservable();
  }

  getTransactionById(id: string): Observable<Transaction | undefined> {
    return this.transactions$.pipe(
      map(transactions => transactions.find(t => t.id === id))
    );
  }

  getTransactionsByAccount(accountId: string): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => t.accountId === accountId))
    );
  }

  getTransactionsByStatus(status: TransactionStatus): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => t.status === status))
    );
  }

  getTransactionsByType(type: TransactionType): Observable<Transaction[]> {
    return this.transactions$.pipe(
      map(transactions => transactions.filter(t => t.type === type))
    );
  }

  createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Observable<Transaction> {
    this.loading$.next(true);
    this.error$.next(null);
    this.loading.set(true);
    this.error.set(null);

    const newTransaction: Transaction = {
      ...transaction,
      id: this.generateTransactionId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return of(newTransaction).pipe(
      delay(500),
      tap(tx => {
        const current = this.transactions$.value;
        this.transactions$.next([...current, tx]);
        this.transactions.set([...this.transactions(), tx]);
        this.transactionObserver.notifyCreated(tx);
      }),
      catchError(err => {
        const errorMsg = 'Error al crear la transacción';
        this.error$.next(errorMsg);
        this.error.set(errorMsg);
        this.transactionObserver.notifyError(newTransaction, err.message);
        throw err;
      }),
      tap(() => {
        this.loading$.next(false);
        this.loading.set(false);
      })
    );
  }

  updateTransaction(id: string, updates: Partial<Transaction>): Observable<Transaction> {
    this.loading$.next(true);
    this.error$.next(null);
    this.loading.set(true);
    this.error.set(null);

    return this.getTransactionById(id).pipe(
      map(existing => {
        if (!existing) {
          throw new Error(`Transaction with id ${id} not found`);
        }
        return { ...existing, ...updates, updatedAt: new Date() };
      }),
      delay(300),
      tap(updated => {
        const current = this.transactions$.value;
        const updatedList = current.map(t => t.id === id ? updated : t);
        this.transactions$.next(updatedList);
        this.transactions.set(updatedList);
        this.transactionObserver.notifyUpdated(updated);
      }),
      catchError(err => {
        const errorMsg = 'Error al actualizar la transacción';
        this.error$.next(errorMsg);
        this.error.set(errorMsg);
        const originalTx = this.transactions().find(t => t.id === id);
        if (originalTx) {
          this.transactionObserver.notifyError(originalTx, err.message);
        }
        throw err;
      }),
      tap(() => {
        this.loading$.next(false);
        this.loading.set(false);
      })
    );
  }

  deleteTransaction(id: string): Observable<boolean> {
    this.loading$.next(true);
    this.error$.next(null);
    this.loading.set(true);
    this.error.set(null);

    return of(true).pipe(
      delay(300),
      tap(() => {
        const current = this.transactions$.value;
        const filtered = current.filter(t => t.id !== id);
        this.transactions$.next(filtered);
        this.transactions.set(filtered);
        this.transactionObserver.notifyDeleted(id);
      }),
      catchError(err => {
        const errorMsg = 'Error al eliminar la transacción';
        this.error$.next(errorMsg);
        this.error.set(errorMsg);
        throw err;
      }),
      tap(() => {
        this.loading$.next(false);
        this.loading.set(false);
      })
    );
  }

  private generateTransactionId(): string {
    return `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  formatAmount(amount: number, currency: string = 'USD'): string {
    const symbol = this.appConfig.getCurrencySymbol();
    return `${symbol}${amount.toFixed(2)}`;
  }

  filterTransactions(
    transactions: Transaction[],
    filters: {
      type?: TransactionType;
      status?: TransactionStatus;
      startDate?: Date;
      endDate?: Date;
      minAmount?: number;
      maxAmount?: number;
      category?: string;
    }
  ): Transaction[] {
    return transactions.filter(t => {
      if (filters.type && t.type !== filters.type) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.startDate && t.createdAt < filters.startDate) return false;
      if (filters.endDate && t.createdAt > filters.endDate) return false;
      if (filters.minAmount && t.amount < filters.minAmount) return false;
      if (filters.maxAmount && t.amount > filters.maxAmount) return false;
      if (filters.category && t.category !== filters.category) return false;
      return true;
    });
  }

  sortTransactions(transactions: Transaction[], sortBy: keyof Transaction, ascending: boolean = true): Transaction[] {
    return [...transactions].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      
      const comparison = aVal < bVal ? -1 : 1;
      return ascending ? comparison : -comparison;
    });
  }
}

// === ARCHIVO: src/app/features/transactions/transaction-list/transaction-list.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, filter } from 'rxjs';
import { Transaction, TransactionStatus, TransactionType } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionObserver, TransactionEvent, TransactionEventType } from '../../../core/observers/transaction.observer';
import { TransactionCardComponent } from '../../../shared/components/transaction-card/transaction-card.component';

interface TransactionFilter {
  type?: TransactionType;
  status?: TransactionStatus;
  searchTerm?: string;
}

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionListComponent implements OnInit, OnDestroy {
  readonly transactions = signal<Transaction[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly filter = signal<TransactionFilter>({});
  readonly sortField = signal<keyof Transaction>('createdAt');
  readonly sortAscending = signal<boolean>(false);

  readonly filteredTransactions = computed(() => {
    let result = this.transactions();
    const currentFilter = this.filter();

    if (currentFilter.type) {
      result = result.filter(t => t.type === currentFilter.type);
    }
    if (currentFilter.status) {
      result = result.filter(t => t.status === currentFilter.status);
    }
    if (currentFilter.searchTerm) {
      const term = currentFilter.searchTerm.toLowerCase();
      result = result.filter(t => 
        t.description.toLowerCase().includes(term) ||
        t.id.toLowerCase().includes(term) ||
        t.category?.toLowerCase().includes(term)
      );
    }

    return this.sortTransactions(result);
  });

  readonly transactionCount = computed(() => this.filteredTransactions().length);
  readonly totalAmount = computed(() => 
    this.filteredTransactions().reduce((sum, t) => sum + t.amount, 0)
  );

  readonly creditTotal = computed(() => 
    this.filteredTransactions()
      .filter(t => t.type === TransactionType.CREDIT)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly debitTotal = computed(() => 
    this.filteredTransactions()
      .filter(t => t.type === TransactionType.DEBIT)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly recentTransactions = computed(() => 
    [...this.filteredTransactions()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  );

  readonly TransactionType = TransactionType;
  readonly TransactionStatus = TransactionStatus;

  private readonly subscriptions: Subscription[] = [];
  private readonly recentEvents: TransactionEvent[] = [];

  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionObserver: TransactionObserver,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeToTransactions();
    this.subscribeToObserverEvents();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.recentEvents.length = 0;
  }

  private subscribeToTransactions(): void {
    const transactionsSub = this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(data);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error.set('Error al cargar las transacciones');
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(transactionsSub);

    const loadingSub = this.transactionService.loading$.subscribe({
      next: (loading) => {
        this.loading.set(loading);
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(loadingSub);

    const errorSub = this.transactionService.error$.subscribe({
      next: (err) => {
        this.error.set(err);
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(errorSub);
  }

  private subscribeToObserverEvents(): void {
    const observerSub = this.transactionObserver.events$.pipe(
      filter(event => event.type !== 'error')
    ).subscribe({
      next: (event) => {
        this.recentEvents.unshift(event);
        if (this.recentEvents.length > 10) {
          this.recentEvents.pop();
        }
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(observerSub);
  }

  setFilter(filterUpdate: Partial<TransactionFilter>): void {
    this.filter.update(current => ({ ...current, ...filterUpdate }));
  }

  clearFilters(): void {
    this.filter.set({});
  }

  setSort(field: keyof Transaction): void {
    if (this.sortField() === field) {
      this.sortAscending.update(v => !v);
    } else {
      this.sortField.set(field);
      this.sortAscending.set(true);
    }
  }

  private sortTransactions(transactions: Transaction[]): Transaction[] {
    const field = this.sortField();
    const ascending = this.sortAscending();
    
    return [...transactions].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];
      
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      
      let comparison = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        comparison = aVal.localeCompare(bVal);
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }
      
      return ascending ? comparison : -comparison;
    });
  }

  deleteTransaction(id: string): void {
    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        console.log(`Transaction ${id} deleted successfully`);
      },
      error: (err) => {
        this.error.set('Error al eliminar la transacción');
        console.error('Delete error:', err);
      }
    });
  }

  getStatusClass(status: TransactionStatus): string {
    const statusClasses: Record<TransactionStatus, string> = {
      [TransactionStatus.COMPLETED]: 'status-completed',
      [TransactionStatus.PENDING]: 'status-pending',
      [TransactionStatus.FAILED]: 'status-failed',
      [TransactionStatus.CANCELLED]: 'status-cancelled'
    };
    return statusClasses[status] || 'status-unknown';
  }

  getTypeLabel(type: TransactionType): string {
    return type === TransactionType.CREDIT ? 'Crédito' : 'Débito';
  }

  getEventDescription(event: TransactionEvent): string {
    const typeLabels: Record<TransactionEventType, string> = {
      'created': 'creada',
      'updated': 'actualizada',
      'deleted': 'eliminada',
      'error': 'error'
    };
    return `Transacción ${event.transactionId} ${typeLabels[event.type]}`;
  }

  getRecentEvents(): TransactionEvent[] {
    return this.recentEvents;
  }
}

// === ARCHIVO: src/app/features/transactions/transaction-calculator/transaction-calculator.component.ts ===
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

// === ARCHIVO: src/app/features/transactions/transaction.model.ts ===
export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'MXN';

export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  amount: number;
  currency: CurrencyCode;
  status: TransactionStatus;
  description: string;
  merchantName: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, unknown>;
}

export interface TransactionSummary {
  totalCredits: number;
  totalDebits: number;
  netAmount: number;
  transactionCount: number;
  averageAmount: number;
  currency: CurrencyCode;
}

export interface TransactionFilter {
  accountId?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  category?: string;
  merchantName?: string;
}

export interface TransactionPageResult {
  transactions: Transaction[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function createTransaction(partial: Partial<Transaction>): Transaction {
  const now = new Date();
  return {
    id: partial.id ?? crypto.randomUUID(),
    accountId: partial.accountId ?? '',
    type: partial.type ?? 'debit',
    amount: partial.amount ?? 0,
    currency: partial.currency ?? 'USD',
    status: partial.status ?? 'pending',
    description: partial.description ?? '',
    merchantName: partial.merchantName ?? '',
    category: partial.category ?? 'general',
    createdAt: partial.createdAt ?? now,
    updatedAt: partial.updatedAt ?? now,
    metadata: partial.metadata ?? {},
  };
}

export function isCreditTransaction(transaction: Transaction): boolean {
  return transaction.type === 'credit';
}

export function isDebitTransaction(transaction: Transaction): boolean {
  return transaction.type === 'debit';
}

export function isPendingTransaction(transaction: Transaction): boolean {
  return transaction.status === 'pending';
}

export function isCompletedTransaction(transaction: Transaction): boolean {
  return transaction.status === 'completed';
}

export function formatTransactionAmount(transaction: Transaction): string {
  const sign = transaction.type === 'credit' ? '+' : '-';
  return `${sign}$${transaction.amount.toFixed(2)}`;
}

export function calculateTransactionFee(transaction: Transaction, feePercentage: number): number {
  return transaction.amount * (feePercentage / 100);
}

export function calculateNetAmount(transaction: Transaction, fee: number): number {
  return transaction.type === 'credit' 
    ? transaction.amount - fee 
    : transaction.amount + fee;
}

// === ARCHIVO: src/app/shared/components/transaction-card/transaction-card.component.ts ===
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Transaction, TransactionType, TransactionStatus } from '../../../features/transactions/transaction.model';

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionCardComponent {
  @Input({ required: true }) transaction!: Transaction;
  @Input() showActions: boolean = true;
  @Input() compactMode: boolean = false;
  @Output() cardClick = new EventEmitter<Transaction>();
  @Output() deleteClick = new EventEmitter<Transaction>();
  @Output() editClick = new EventEmitter<Transaction>();

  readonly isCredit = computed(() => this.transaction?.type === 'credit');
  readonly isPending = computed(() => this.transaction?.status === 'pending');
  readonly isCompleted = computed(() => this.transaction?.status === 'completed');
  readonly isFailed = computed(() => this.transaction?.status === 'failed');
  readonly formattedAmount = computed(() => this.formatAmount());
  readonly statusColor = computed(() => this.getStatusColor());
  readonly typeIcon = computed(() => this.getTypeIcon());
  readonly formattedDate = computed(() => this.formatDate());

  private formatAmount(): string {
    if (!this.transaction) return '';
    const sign = this.transaction.type === 'credit' ? '+' : '-';
    return `${sign}$${this.transaction.amount.toFixed(2)} ${this.transaction.currency}`;
  }

  private getStatusColor(): string {
    const colors: Record<TransactionStatus, string> = {
      pending: 'warn',
      completed: 'primary',
      failed: 'accent',
      cancelled: ''
    };
    return colors[this.transaction?.status] || '';
  }

  private getTypeIcon(): string {
    return this.transaction?.type === 'credit' ? 'arrow_downward' : 'arrow_upward';
  }

  private formatDate(): string {
    if (!this.transaction?.createdAt) return '';
    const date = new Date(this.transaction.createdAt);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onCardClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('button')) return;
    this.cardClick.emit(this.transaction);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteClick.emit(this.transaction);
  }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.editClick.emit(this.transaction);
  }

  getCategoryClass(): string {
    const categoryMap: Record<string, string> = {
      'food': 'category-food',
      'transport': 'category-transport',
      'shopping': 'category-shopping',
      'entertainment': 'category-entertainment',
      'utilities': 'category-utilities',
      'health': 'category-health',
      'general': 'category-general'
    };
    return categoryMap[this.transaction?.category] || 'category-general';
  }
}

// === ARCHIVO: README.md ===
# Angular Banking Transactions

Aplicación Angular para gestión de transacciones financieras que implementa patrones de diseño GOF (Singleton, Observer, Strategy) para mejorar la arquitectura y mantenibilidad del código.

## Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior
- Angular CLI 20.0.0

## Instalación

```bash
npm install
```

## Ejecución del Proyecto

### Desarrollo
```bash
npm start
```
Accede a `http://localhost:4200`

### Producción
```bash
npm run build
```

Los archivos generados estarán en `dist/angular-banking-transactions`

## Testing

```bash
npm test
```

## Estructura del Proyecto

```
src/app/
├── core/                    # Configuración centralizada y servicios singleton
│   ├── config/             # Servicio de configuración (patrón Singleton)
│   ├── observers/          # Observadores de eventos (patrón Observer)
│   └── strategies/         # Estrategias de cálculo (patrón Strategy)
├── features/               # Funcionalidades de negocio
│   └── transactions/       # Gestión de transacciones
├── shared/                 # Componentes reutilizables
│   └── components/         # Componentes presentacionales
```

## Patrones de Diseño Implementados

### Singleton - AppConfigService
Servicio de configuración global accesible en toda la aplicación. Implementado con `providedIn: 'root'` para garantizar una única instancia.

### Observer - TransactionObserver
Sistema de notificaciones para eventos de transacciones (creación, actualización, eliminación, errores). Utiliza RxJS Subject para la comunicación entre componentes.

### Strategy - Calculation Strategies
Diferentes algoritmos de cálculo (monto total, comisiones, intereses) que pueden intercambiarse dinámicamente en tiempo de ejecución.

## Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run watch` | Compila en modo desarrollo con watcher |
| `npm test` | Ejecuta las pruebas unitarias |
| `npm run lint` | Ejecuta el linter |

## Tecnologías

- Angular 20.0.0
- Angular Material 17.0.0
- RxJS 7.8.0
- TypeScript 5.3.3
- Jest 29.7.0
```
