# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Aplicación de Patrones de Diseño en Proyecto Angular**.

| | |
|---|---|
| Tema | Patrones de diseño GOF aplicados a frontend |
| Nivel | senior-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 20 |
| Patron arquitectonico | capas estándar con separación de responsabilidades (core, features, shared) |
| Tiempo estimado | 20 horas |

## Receta del stack

Esqueleto obligatorio:

- `package.json, angular.json y tsconfig.json en la raiz`
- `src/main.ts con bootstrapApplication`
- `src/app/app.config.ts con los providers`
- `src/app/core con servicios y modelos`
- `src/app/features con componentes contenedores`
- `src/app/shared con componentes presentacionales`

Trampas conocidas:

- No inventes versiones de npm: una version inexistente hace fallar `npm install` con ETARGET y el proyecto no instala. Usa rango con caret sobre una version que exista.
- El `package.json` tiene que ser JSON valido y UNICO: nada despues de la llave de cierre.
- Angular necesita `angular.json` y `tsconfig.json` ademas del `package.json`, o `ng build` no corre.

Dependencias:

- @angular/core 20.0.0
- @angular/common 20.0.0
- @angular/router 20.0.0
- @angular/platform-browser 20.0.0
- @angular/platform-browser-dynamic 20.0.0
- rxjs 7.8.0
- @angular/material 17.0.0
- @angular/cdk 17.0.0
- @angular/animations 20.0.0
- @angular/forms 20.0.0
- @types/node 20.11.19
- typescript 5.3.3
- zone.js 0.14.0
- jest 29.7.0
- @angular-eslint/eslint-plugin 17.0.0

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Implementación del Patrón Singleton**: Servicio de configuración global implementado con el patrón Singleton y accesible en la aplicación Angular.
- **Fase 2 — Aplicación del Patrón Observer**: Componente que utiliza el patrón Observer para actualizarse en respuesta a cambios en el estado de la aplicación.
- **Fase 3 — Integración del Patrón Strategy**: Funcionalidad que utiliza el patrón Strategy para seleccionar y aplicar diferentes algoritmos de cálculo.
- **Fase 4 — Refactorización y Optimización**: Código refactorizado que aplica los patrones de diseño aprendidos, mejorando la legibilidad, mantenibilidad y rendimiento de la aplicación.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Referencias colgando (4)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/features/transactions/transaction-list/transaction-list.component.ts` — `TransactionEvent.unshift`
      Se invoca `unshift` sobre `TransactionEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/transactions/transaction-list/transaction-list.component.ts` — `TransactionEvent.pop`
      Se invoca `pop` sobre `TransactionEvent`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/transactions/transaction-calculator/transaction-calculator.component.ts` — `CalculationType.set`
      Se invoca `set` sobre `CalculationType`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/transactions/transaction-calculator/transaction-calculator.component.ts` — `CalculationResult.set`
      Se invoca `set` sobre `CalculationResult`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (18)

- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/app/core/config/app-config.service.ts`
- `src/app/core/observers/transaction.observer.ts`
- `src/app/core/strategies/calculation.strategy.ts`
- `src/main.ts`
- `src/styles.scss`
- `src/index.html`
- `src/app/core/config/app-config.model.ts`
- `src/app/app.config.ts`
- `src/app/app.routes.ts`
- `src/app/features/transactions/transaction.service.ts`
- `src/app/features/transactions/transaction-list/transaction-list.component.ts`
- `src/app/features/transactions/transaction-calculator/transaction-calculator.component.ts`
- `src/app/features/transactions/transaction.model.ts`
- `src/app/shared/components/transaction-card/transaction-card.component.ts`
- `README.md`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/app/core`
- `src/app/features/transactions`
- `src/app/shared`
- `src/app/core/config`
- `src/app/core/strategies`
- `src/app/core/observers`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar con separación de responsabilidades (core, features, shared)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Senior
- Brecha que el reto ataca: Aplica conscientemente al menos 3 patrones de diseño (Gang of four patterns) aplicados a frontend. El objetivo es que domines la aplicación de patrones como Singleton, Observer, Strategy, Factory, Decorator y otros en contextos de desarrollo frontend real, mejorando la arquitectura y mantenibilidad del código.
- Mision: Candidato con experiencia Senior en Frontend, buscando fortalecer habilidades de diseño de software en proyectos Angular.

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
