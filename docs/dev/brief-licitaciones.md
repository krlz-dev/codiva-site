# Brief para análisis de marketing
## Alertas inteligentes de licitaciones públicas (Chile)

**Fecha:** 2026-10-06 · **Estado:** idea sin validar con clientes
**Autor del brief:** Merisiel · **Para:** análisis de marketing

---

## 1. La idea en una frase

Una empresa declara qué vende y dónde opera. Cada mañana recibe **solo las
licitaciones públicas que le calzan**, con una explicación de por qué le
calzan — no una lista de coincidencias de palabras.

---

## 2. El problema (VERIFICADO con datos)

Mercado Público publica un volumen que ninguna persona puede revisar:

| Fecha | Licitaciones publicadas |
|---|---|
| 2026-10-02 (viernes) | **1.197** |
| 2026-10-04 (domingo) | 1 |

Extrapolado a días hábiles: **~25.000 licitaciones/mes**.

> Una empresa que le interesan 3 licitaciones tiene que descartar 1.194.
> El filtrado no es una comodidad: es la única forma de usar el canal.

### Por qué los filtros actuales no alcanzan

Títulos reales extraídos de la API:

```
SUTURAS GRASTRICAS                              ← con error de tipeo
AC - HORAS MATRONAS CIRUGIAS VARIAS geb         ← abreviaturas internas
CONVENIO SUMINISTRO MINIFIJADOR DE MUÑECA
"CONVENIO DE CERRAJERÍA Y MANTENCIÓN DE SILLAS DE RUEDAS" nat
```

Sin tildes, con faltas de ortografía, con códigos internos (`geb`, `nat`).
**Una búsqueda por palabra clave falla con esto**, y es lo que usan los
servicios existentes.

---

## 3. Nicho propuesto

**Proveedores del sector salud**: insumos médicos, servicios clínicos,
mantención hospitalaria.

Razones:
- La muestra de la API está dominada por compras de hospitales
- Son empresas pequeñas y medianas, normalmente **sin nadie dedicado a
  revisar el portal**
- Compra recurrente: el mismo hospital licita insumos todo el año

---

## 4. Propuesta de valor y ángulo diferenciador

| | Servicios existentes | Esta propuesta |
|---|---|---|
| Filtrado | palabra clave | lectura con IA del objeto de la licitación |
| Resultado | muchas alertas irrelevantes | pocas, con justificación |
| Costo marginal del análisis | — | cercano a cero (infraestructura propia) |

**Mensaje candidato (a validar con marketing):**
*"Dejá de revisar 1.200 licitaciones diarias. Te mandamos las 3 que son
tuyas, y te decimos por qué."*

---

## 5. Modelo de ingreso

Suscripción mensual. Rango a definir, referencia inicial
**CLP 30.000–80.000/mes** por empresa.

**Argumento de ROI:** una sola licitación ganada paga años de suscripción.
El cliente **ya gasta** en preparar propuestas; esto no crea un gasto nuevo,
reduce el desperdicio del existente.

---

## 6. Lo que está VERIFICADO

- ✅ **Volumen del problema**: 1.197 licitaciones en un día hábil (API oficial)
- ✅ **La API existe y es usable**: `api.mercadopublico.cl`, documentada. El
  HTTP 429 del ticket público es saturación por uso, no falla
- ✅ **El presupuesto existe**: ya hay competidores cobrando por alertas de
  Mercado Público en Chile
- ✅ **Capacidad técnica**: el motor (ingesta → filtro → análisis → entrega
  diaria) ya está construido y operando en otros dos proyectos propios, con
  costo de análisis cero

---

## 7. 🔴 Lo que NO está verificado — preguntas para marketing

Estas son las que deciden si el proyecto sigue:

1. **¿Las licitaciones se ganan por información o por relación?**
   Si se ganan por contacto con el comprador, el producto informa pero no
   cambia resultados — y nadie paga por eso. **Esta pregunta puede matar la
   idea.**

2. **¿Las empresas que ya pagan un servicio están conformes?**
   Si están contentas, el mercado está tomado. Si se queja del ruido,
   confirma el ángulo diferenciador.

3. **¿Quién decide la compra?** ¿El dueño, el área comercial, el que arma
   las propuestas? Define el canal y el mensaje.

4. **¿Cuánto vale para ellos una licitación perdida?** Sin esa cifra, el
   argumento de ROI es retórica.

5. **¿Es un dolor que nombran espontáneamente**, o hay que explicárselo?
   Lo segundo encarece la venta de forma decisiva.

---

## 8. Validación propuesta antes de construir

**Tres conversaciones con proveedores del sector salud que vendan al Estado.**
Una pregunta de apertura:

> *"¿Cómo se enteran hoy de las licitaciones que les sirven? ¿Se les ha
> pasado alguna?"*

| Respuesta | Lectura |
|---|---|
| "Revisamos a mano y se nos pasan" | 🟢 hay producto |
| "Ya pagamos X y funciona bien" | 🟠 mercado tomado, revisar ángulo |
| "Las ganamos por contactos" | 🔴 detener el proyecto |

**Costo de esta validación: cero. Tiempo: una semana.**

---

## 9. Antecedente que justifica este orden

Hay cinco productos propios construidos y publicados (Vivesta, TubeWords,
Reporte Bolivia, Reporte Chile, guía para extranjeros). Tráfico conjunto
medido en Umami: **141 visitantes en 30 días**; Vivesta: **0 pagos**.

Ninguno se validó con clientes antes de construirse.

> **Esta vez el orden se invierte: primero la conversación, después el
> código.**

---

## 10. Riesgos conocidos

- **Competencia establecida**: no es terreno virgen; no se entra por ser
  primero sino por calidad del filtrado
- **Dependencia de un tercero**: todo el producto depende de la API de
  Mercado Público. Si cambia o se restringe, el producto se detiene
- **Rate limit**: requiere ticket propio (gratuito, con registro)
- **Nicho posiblemente estrecho**: falta dimensionar cuántos proveedores de
  salud activos hay en Chile — pendiente de medir
