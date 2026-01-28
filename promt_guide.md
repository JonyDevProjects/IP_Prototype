# Guía Completa de Prompt Engineering

He analizado los mejores cursos de **Prompt Engineering** del mundo—incluyendo los de **Deep Learning (Andrew NG)**, **IBM** y **Google**—para condensar todo el conocimiento en esta guía estratégica.

---

## 1. El Principio Fundamental: Claridad y Especificidad

Google, IBM y Andrew NG coinciden en que el principio número uno es la **claridad, concreción y especificidad**. Mientras más información le das al modelo, menos tiene que adivinar.

### Las 4 Dimensiones de IBM
Para que un prompt sea efectivo, debe cumplir con:
1.  **Claridad**: Instrucciones directas.
2.  **Contexto**: Información de trasfondo.
3.  **Precisión**: Detalles específicos.
4.  **Rol**: Definir quién es la IA (ej. "Actúa como un experto en marketing").

> [!TIP]
> Google recomienda ser simple y directo: dile exactamente qué quieres sin rodeos.

---

## 2. La Importancia del Contexto

Las alucinaciones en la IA suelen ocurrir por falta de contexto. Si pides algo genérico, obtendrás una respuesta mediocre.

**Ejemplo de mejora por contexto:**
-   **Prompt Pobre**: "Escribe un post para LinkedIn."
-   **Prompt Efectivo**: 
    -   **Rol**: Experto en ciberseguridad.
    -   **Audiencia**: Dueños de PYMES.
    -   **Tema**: Riesgos del phishing.
    -   **Estilo**: Informativo pero alarmante.
    -   **Extensión**: Máximo 200 palabras.

---

## 3. Few-Shot Prompting (Instrucciones con Ejemplos)

Andrew NG define el **Few-Shot Prompting** como proporcionar ejemplos reales dentro del prompt. Mostrar es mejor que decir.

### ¿Cómo aplicarlo?
Si quieres que la IA escriba con tu tono de voz, no intentes describirlo. Dale ejemplos:
```text
Aquí tienes tres ejemplos de cómo escribo mi newsletter:
[Ejemplo 1]
[Ejemplo 2]
[Ejemplo 3]

Usa el mismo estilo y tono para escribir sobre el siguiente tema: [Tema]
```

---

## 4. Chain of Thought (Cadena de Pensamiento)

Los modelos de lenguaje tienden a responder lo primero que se les ocurre. La técnica **Chain of Thought (CoT)** los obliga a razonar antes de concluir.

### Zero-Shot CoT
La forma más simple es añadir la frase: **"Piensa paso a paso"**.
Al hacer esto, el modelo analiza variables y diagnostica el problema antes de dar la respuesta final.

### Few-Shot CoT (Avanzado)
Consiste en dar ejemplos de problemas similares ya resueltos paso a paso. El modelo aprende tu método de razonamiento y lo replica.

> [!NOTE]
> Con los modelos "razonadores" modernos (como o1 o Gemini 1.5 Pro), a veces "menos es más". Ya razonan por defecto, por lo que ser excesivamente detallado puede generar respuestas redundantes.

---

## 5. Tree of Thoughts (Árbol de Pensamientos)

Para decisiones complejas con múltiples soluciones, IBM enseña el **Tree of Thoughts**. En lugar de seguir un único camino, pides a la IA que explore varios simultáneamente.

**Estructura del prompt:**
1.  Establece tres estrategias radicalmente distintas.
2.  Desarrolla una línea de razonamiento para cada una.
3.  Pide una recomendación final comparando las tres alternativas.

Es ideal para:
-   Estrategia de negocio.
-   Diseño creativo.
-   Problemas con múltiples variables.

---

## 6. El Ciclo de Retroalimentación e Iteración

El prompting es un proceso **iterativo**. Si la respuesta es mediocre, no te rindas; mejora el prompt usando estas 4 reglas de Google:
1.  **Revisa el contexto/rol**: ¿Sabe quién es y para qué sirve?
2.  **Simplifica**: Divide instrucciones largas en oraciones simples o listas.
3.  **Cambia el enfoque**: Prueba un ángulo diferente (ej. cambia el rol).
4.  **Añade restricciones**: "Máximo 3 párrafos", "No uses la palabra 'revolucionario'".

### Meta-prompting
Si no sabes cómo escribir un prompt, pide a la IA que te ayude a crearlo:
```text
Quiero conseguir [Objetivo]. Hazme todas las preguntas necesarias para entender cómo darme la mejor solución y redactar la instrucción perfecta.
```

---

## 7. Caso Práctico: Combinando todo el sistema

Para un fotógrafo freelance que necesita una propuesta:
```text
ROL: Fotógrafo corporativo experto.
CONTEXTO: Cliente de tecnología renovando su web.
OBJETIVO: Redactar propuesta de 2 días de sesión de fotos.
SUBTAREAS: Presupuesto, equipo necesario, tiempos de entrega.
RESTRICCIONES: Tono profesional pero cercano, no exceder 1 página.
EJEMPLO: [Adjuntar estructura de propuesta anterior].
```

---

## Resumen del Sistema
**Claridad + Contexto + Ejemplos + Razonamiento + Iteración**

Este es el marco de trabajo que garantiza resultados profesionales y ahorra horas de trabajo cada semana.
