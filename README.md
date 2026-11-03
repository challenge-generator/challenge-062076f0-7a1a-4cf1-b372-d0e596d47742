# Aplicación de Patrones de Diseño en Proyecto Angular

Como desarrollador senior de frontend en un proyecto de banca digital, necesitas implementar y aplicar al menos tres patrones de diseño GOF (Singleton, Observer, Strategy) para mejorar la arquitectura y mantenibilidad del código. El proyecto involucra la creación de una aplicación Angular que gestiona transacciones financieras, donde cada patrón de diseño resolverá un problema específico del dominio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Patrones de diseño GOF aplicados a frontend |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 20 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Implementación del Patrón Singleton

**Objetivo:** Aplicar el patrón Singleton para gestionar un servicio de configuración global en la aplicación Angular.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Identificar la necesidad de un servicio de configuración global en la aplicación.
- Implementar el patrón Singleton para asegurar que solo exista una instancia del servicio de configuración.
- Verificar que el servicio de configuración se comporta como Singleton y es accesible desde cualquier componente de la aplicación.

**Entregable:** Servicio de configuración global implementado con el patrón Singleton y accesible en la aplicación Angular.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que el patrón Singleton asegura que una clase tiene solo una instancia y proporciona un punto de acceso global a ella.

</details>

### Fase 2: Aplicación del Patrón Observer

**Objetivo:** Utilizar el patrón Observer para manejar eventos de actualización en la aplicación Angular.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Identificar un componente que necesita reaccionar a cambios en el estado de la aplicación.
- Implementar el patrón Observer para que el componente se suscriba y reciba notificaciones de cambios.
- Verificar que el componente se actualiza correctamente cuando ocurren cambios en el estado observado.

**Entregable:** Componente que utiliza el patrón Observer para actualizarse en respuesta a cambios en el estado de la aplicación.

<details>
<summary>Pistas de conocimiento</summary>

- El patrón Observer permite a los objetos suscribirse a eventos y reaccionar cuando estos ocurren.

</details>

### Fase 3: Integración del Patrón Strategy

**Objetivo:** Incorporar el patrón Strategy para gestionar diferentes algoritmos de cálculo en la aplicación Angular.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Identificar una funcionalidad que requiere diferentes algoritmos de cálculo.
- Implementar el patrón Strategy para permitir la selección dinámica de algoritmos.
- Verificar que la aplicación puede cambiar de algoritmo en tiempo de ejecución sin afectar la funcionalidad principal.

**Entregable:** Funcionalidad que utiliza el patrón Strategy para seleccionar y aplicar diferentes algoritmos de cálculo.

<details>
<summary>Pistas de conocimiento</summary>

- El patrón Strategy permite definir una familia de algoritmos, encapsularlos y hacerlos intercambiables en tiempo de ejecución.

</details>

### Fase 4: Refactorización y Optimización

**Objetivo:** Refactorizar el código para mejorar la legibilidad, mantenibilidad y rendimiento, aplicando los patrones de diseño aprendidos.

**Tiempo estimado:** 5 horas

**Instrucciones:**

- Revisar el código implementado en las fases anteriores.
- Identificar oportunidades de refactorización y optimización utilizando los patrones de diseño.
- Aplicar cambios y verificar que la funcionalidad y rendimiento de la aplicación no se ven afectados.

**Entregable:** Código refactorizado que aplica los patrones de diseño aprendidos, mejorando la legibilidad, mantenibilidad y rendimiento de la aplicación.

<details>
<summary>Pistas de conocimiento</summary>

- Recuerda que la refactorización no solo mejora la estructura del código, sino que también puede optimizar su rendimiento.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es el patrón Singleton y por qué se usa en la aplicación?
- **paraQueSirve**: ¿Para qué sirve el patrón Observer en el contexto de la aplicación Angular?
- **comoSeUsa**: ¿Cómo se aplica el patrón Strategy en la funcionalidad de cálculo de la aplicación?
- **erroresComunes**: ¿Qué errores comunes pueden ocurrir al implementar el patrón Observer y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la aplicación del patrón Strategy en términos de selección de algoritmos?

## Criterios de Evaluacion

- Implementación correcta del patrón Singleton para el servicio de configuración global.
- Uso efectivo del patrón Observer para manejar eventos de actualización en la aplicación.
- Aplicación del patrón Strategy para gestionar diferentes algoritmos de cálculo.
- Refactorización y optimización del código utilizando los patrones de diseño aprendidos.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
