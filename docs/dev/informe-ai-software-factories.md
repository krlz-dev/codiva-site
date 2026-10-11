# Software factories en tiempo de IA — evidencia empírica

**Fecha:** 2026-10-11 · **Autor:** Merisiel
**Origen:** artículo de dev.to sobre "AI software factories" + búsqueda de
evidencia independiente para cubrir sus vacíos.

---

## 0. Tesis

> La categoría "AI software factory" optimiza la **generación**, que ya era el
> paso barato. La evidencia independiente muestra que el costo se trasladó a
> **revisión, cumplimiento y supervisión** — y que esa supervisión, en la
> práctica, no está ocurriendo.

---

## 1. Lo que el artículo de dev.to aporta y lo que le falta

El marco de cuatro preguntas es útil y vale conservarlo: qué inicia el
trabajo, dónde aprueba un humano, dónde vive el contexto, dónde corren los
agentes. La pregunta 2 ordena todo el campo:

```
Copilot cloud agent   el PR (al final)
Factory               gates configurables alrededor de tareas
Augment Cosmos        checkpoints que defines
Kiro (AWS)            el spec, en el editor
Forge                 4 etapas ANTES de que exista código
```

**Vacíos declarados por el autor:** no hizo benchmark, y las cifras de Opsera
para Forge son autoinformadas y no verificadas.

**Vacíos no declarados:** no hay precios, y no hay nada sobre qué pasa cuando
el agente se equivoca.

**Sesgo:** Forge recibe el doble de espacio que las otras cuatro, con el
detalle de qué etapas tienen gate, y el cierre invita a leer sus docs.

---

## 2. Productividad: los estudios controlados

### 2.1 El único RCT riguroso encontró DESACELERACIÓN

**METR** — `arXiv:2507.09089` · https://arxiv.org/abs/2507.09089

```
método    RCT real · 16 devs experimentados · 246 tareas reales
          repos propios maduros (media 22k+ ⭐, 1M+ LOC)
          ~5 años de experiencia previa en ese repo
          randomización por issue · grabación de pantalla

resultado  con IA tardan 19 % MÁS  (IC 95 %: +2 % a +39 %)
           predijeron −24 % antes · creyeron −20 % después
           → brecha percepción/realidad de ~39 puntos
```

### 🔴 2.2 Pero METR lo retiró — y la retractación dice más que el dato

https://metr.org/blog/2026-02-24-uplift-update/ · la página de 2025 lleva
banner: *"These results are out of date."*

Segundo estudio (10 devs originales + 47 nuevos): **−18 % para el subconjunto
original (IC −38 % a +9 %)** y **−4 % para los nuevos (IC −15 % a +9 %)** —
ambos intervalos cruzan el cero.

METR declara el signo **no fiable por sesgo de selección**, y la razón es el
hallazgo más revelador de todo este informe:

> *"30 % a 50 % de los devs nos dijeron que no enviaban algunas tareas porque
> no querían hacerlas sin IA."*

**Cómo citarlo sin quedar expuesto:** no "la IA te hace 19 % más lento", sino
*"el único RCT riguroso que midió esto encontró desaceleración en early-2025,
y su continuación fue abandonada por sesgo de selección porque los
desarrolladores ya se niegan a trabajar sin IA."* Eso es más fuerte que el
número solo.

### 2.3 Los estudios con aceleración, y quién los pagó

| Estudio | Cifra | Metodología | Independencia |
|---|---|---|---|
| `arXiv:2302.06590` | **−55,8 %** tiempo | tarea única, servidor HTTP en JS | 🔴 **GitHub sobre su producto**; greenfield de juguete |
| `arXiv:2410.12944` | **−21 %** | RCT, 96 ingenieros full-time | 🟠 **Google sobre su tooling**; "IC amplio" |
| `arXiv:2507.00788` | **−30,7 %** fase 1 | 2 fases, **151 participantes (95 % profesionales)** | ✅ independiente |
| `arXiv:2509.20353` | **sin cambio** | longitudinal, **26.317 commits, 703 repos, 2 años** | ✅ independiente (NAV IT, sector público) |

**El mejor diseño es `2507.00788`, y su segundo hallazgo es el que importa:**

```
fase 1 (observacional)  escribir con IA → −30,7 % de tiempo
fase 2 (RCT)            otros devs evolucionan ESE código, sin IA
                        → NINGUNA diferencia significativa
```

> Bayesiano: cualquier ventaja es *"small and highly uncertain"*. **La ganancia
> de escribir se evapora cuando otro humano tiene que mantener el resultado**
> — que es exactamente el costo que una software factory promete absorber.

---

## 3. El costo de revisar: el cuello de botella real

### 3.1 La "attention tax", con nombre y dato

**`arXiv:2601.00753`** — 33.707 PRs de agentes. Lo nombra literalmente:

> *"they introduce a critical new bottleneck: human maintainers must now manage
> complex interaction loops rather than just reviewing code"*

```
régimen bimodal   28,3 % de los PRs mergean instantáneamente
                  el resto cae en "ghosting" (abandono ante feedback)

modelo Circuit Breaker: predice el PR caro ANTES de revisarlo
                        AUC 0,96
                        20 % de presupuesto de revisión → 69 % de los PRs caros
```

**Si el costo de revisión se puede predecir con AUC 0,96, es la variable
económica real del sistema.**

### 3.2 El agente te miente en el cuerpo del PR

**`arXiv:2601.04886`** — 23.247 PRs agénticos, 974 anotados a mano.

```
tipo más común de inconsistencia (45,4 %):
   "la descripción afirma cambios no implementados"

PRs de alta inconsistencia:
   aceptación 28,3 % vs 80,0 %   → 51,7 puntos menos
   tiempo a merge 55,8 h vs 16,0 h → 3,5× más
```

### 3.3 Quien menos sabe genera más trabajo ajeno

**`arXiv:2602.23905`** — 22.953 PRs de 1.719 "vibe coders" (dataset AIDev).
Baja experiencia vs alta:

```
2,15× más commits · 1,47× más archivos
4,52× más comentarios de revisión
31 % menos aceptación · 5,16× más tiempo abiertos
```

Conclusión textual: *"shifting verification burden onto reviewers"*.

### 3.4 En producción, a escala

**`arXiv:2608.06640`** — **3,52 millones de cambios de código**, abr 2025–abr
2026, empresa con productos usados por "billions of users". Encuentra
**"increased review effort"** y **+5–8 % de consumo de cómputo**. Mitigación
con feedback taxonómico: −11,1 % de warnings. *(Empresa anonimizada → tratar
como semi-vendor.)*

### ⚠️ 3.5 El hueco más llamativo de la literatura

**No existe ningún estudio controlado que cronometre minutos de revisión de
código IA vs humano, con el mismo revisor y tareas pareadas.**

Es el número que decide la economía de toda la categoría, y nadie lo ha
medido. Buen argumento para exigirlo en una demo.

---

## 4. 🔴 La supervisión declarada no es la que ocurre

Este es el hallazgo más grave del informe.

**`arXiv:2601.13754` "On Autopilot?"**

```
>67,5 % de los PRs co-autorados por IA vienen de contribuyentes
        SIN code ownership previo
la mayoría de repos NO tiene guidelines de uso de agentes
~80 % de los PRs co-autorados por IA se mergean SIN NINGUNA
        revisión explícita
```

**Invierte el patrón humano**, donde un contribuyente sin ownership recibe
*más* escrutinio, no menos.

**`arXiv:2605.02273` "These Aren't the Reviews You're Looking For"**

> La mayoría de PRs generados por IA no recibe revisión, y cuando la recibe
> está **dominada por otros agentes, no humanos**. La participación humana se
> expresa como *"agent steering"* más que evaluación.
>
> Advertencia explícita: **las métricas de review NO son proxy de supervisión
> humana.**

### Por qué esto importa tanto

Cruzado con `arXiv:2610.06193` (SWE-CC): los agentes violan **43,1 % de las
políticas del repositorio** aunque los parches sean funcionalmente correctos,
y **~50 % de las violaciones ocurren en pasos intermedios**.

> Hay 43 % de incumplimiento de política y ~80 % de merges sin revisión
> explícita. **Nadie está mirando las violaciones.** El control de calidad se
> evapora justo donde el volumen crece.

---

## 5. Deuda técnica: el pasivo acumulado

**`arXiv:2603.28592`** — **302.600 commits de IA en 6.299 repos**, 5
asistentes, análisis estático antes/después para atribuir con precisión.

```
484.366 problemas distintos
89,3 %  code smells
>15 %   de los commits de CADA asistente introducen ≥1 problema
22,7 %  de los problemas introducidos SIGUEN SIN CORREGIRSE
```

**`arXiv:2601.13597`** (causal, difference-in-differences con controles
pareados):

```
ganancias de velocidad front-loaded, y SOLO si el agente es la
primera herramienta de IA del proyecto
con IDE-IA previa → aumento mínimo o efímero

riesgos persistentes:
   warnings de análisis estático  +~18 %
   complejidad cognitiva          +~39 %
```

**`arXiv:2609.17598` "Not All Agents Are Equal"** — 37.623 PRs con provenance
+ baseline humano pareado. **Matiz importante y honesto:**

```
revert post-merge   Codex 6,1 %  vs  humanos 11,5 %  (OR 0,50)
                    Devin 14,5 %                      (OR 1,31)
code smells de seguridad: agentes OR 0,63 (MENOS que humanos)
```

> **No todo es peor con agentes.** Codex revierte menos que un humano. La
> diferencia está entre agentes, no "IA vs humano".

**Marco conceptual** — `arXiv:2603.22106`, Triple Debt Model:

| Tipo | Dónde vive | Qué es |
|---|---|---|
| technical debt | en el código | lo de siempre |
| **cognitive debt** | en las personas | erosión del entendimiento compartido |
| **intent debt** | en el conocimiento | ausencia de razones y restricciones explícitas |

> *"As AI generates code faster than teams can understand it"*

Esto explica por qué los gates de spec apuntan a algo real: el **intent debt**
es precisamente lo que un PRD aprobado previene.

---

## 6. La brecha percepción/realidad, medida

| Fuente | Adopción | Confianza |
|---|---|---|
| **DORA 2025** (Google = vendor, ~5.000 prof.) | 90 % usa IA · **>80 % cree que subió su productividad** | **30 % reporta poca o ninguna confianza** en el código generado |
| **Stack Overflow 2025** (n=31.476, independiente) | 84 % usa o planea · 51 % a diario | **46 % desconfía vs 33 % confía** · solo **3,1 % "highly trust"** |

**DORA 2025**, el hallazgo que contradice el marketing:

> *"AI adoption does continue to have a negative relationship with software
> delivery **stability**"*

Relación positiva nueva con throughput, **pero sigue negativa con
estabilidad**. Tesis DORA: *"AI doesn't fix a team; it amplifies what's
already there."*

**Stack Overflow 2025** — adopción sube, sentimiento baja de >70 % (2023-24) a
**60 %**:

```
frustración #1   "AI solutions that are almost right, but not quite"  66 %
frustración #2   "Debugging AI-generated code is more time-consuming" 45,2 %

20 %    "me volví menos confiado en mi propia resolución de problemas"
16,3 %  "es difícil entender cómo o por qué funciona el código"
```

**Y la resistencia está justo donde vive la revisión:**

```
58,7 % NO planea usar IA para "committing and reviewing code"
69,2 % no para project planning
75,8 % no para deployment and monitoring
72,2 % dice que "vibe coding" NO es parte de su trabajo profesional
```

Los devs con 10+ años son los más cautos: **2,5 % highly trust, 20,7 % highly
distrust**.

> Las decisiones de compra de "AI software factories" se están tomando sobre
> el número **autoinformado** (>80 % cree que mejoró), no sobre el medido.

---

## 7. Precios (consultados 2026-10-11)

| Plataforma | Precios | Fuente |
|---|---|---|
| **Factory (Droids)** | Pro $20/mes · Plus $100 · Max $200 · **Teams $60/mes por equipo + $40/mes por asiento** (≤10) | factory.ai/pricing |
| **Augment Code (Cosmos)** | Standard **$20/mes flat, sin cargo por asiento, hasta 50 asientos** · Business $100/mes flat · **uso = inferencia a precio de lista + 40 % de service fee**, pooleado entre el equipo | augmentcode.com/pricing |
| **Kiro (AWS)** | Free $0 (50 créditos) · Pro $20/user (1.000 cr) · hasta Power $200 (10.000 cr) · add-on **$0,04/crédito** | kiro.dev/pricing |
| **GitHub Copilot** | Free $0 · Pro $10 · Pro+ $39 · Max $100 · créditos: Pro $15/mes, Max $200. **Cloud agent y code review solo desde Pro** | github.com/features/copilot/plans |
| **Devin (Cognition)** | Pro $20 · Max $200 · **Teams $80/mes + $40 por asiento** | devin.ai/pricing |
| **Cursor** | Individual **$20/mes** · **Teams $40/user/mes** | cursor.com/pricing |
| **Forge** | 🔴 **NO ENCONTRADO** — `forge.codes` es un dominio en venta; `forgecode.dev/pricing` y `forgecode.ai/pricing` → 404 | — |

**El modelo de Augment es el más interesante:** flat por organización sin
cargo por asiento, y el margen se hace sobre un 40 % de recargo al consumo de
inferencia. Alinea el precio con el uso real, no con el tamaño del equipo.

⚠️ **Que Forge no tenga precio público ni dominio localizable, siendo la
plataforma con más espacio en el artículo, es un dato en sí mismo.**

---

## 8. Qué significa para codiva

### 8.1 El desplazamiento del valor

```
ANTES   escribir el código
AHORA   garantizar que lo generado funciona, cumple y se puede mantener
```

Generar es commodity: LangChain tiene 147.613 ⭐, Dify 158.141 ⭐, y están
gratis. Lo que no se puede bajar de GitHub es el proceso de gobernanza.

**El ecosistema lo confirma:** ninguna de las cinco "software factories" del
artículo aparece en los topics de GitHub. La comunidad construye
**componentes**; los vendors venden **proceso**.

### 8.2 Tres servicios vendibles, sin construir producto nuevo

1. **Auditoría de deuda introducida por IA.** Método público y replicable
   (análisis estático antes/después, atribución por commit). Entregable: qué
   introdujo la IA y cuánto sigue abierto. Referencia: `2603.28592`.
2. **Diseño de gates de aprobación.** Dónde poner el checkpoint según si el
   problema del cliente está en requisitos o en revisión.
3. **Política de cumplimiento para agentes.** SWE-CC convirtió documentación
   en 823 reglas verificables. Es trabajo concreto, medible y hoy nadie lo
   hace: la mayoría de repos no tiene guidelines (`2601.13754`).

### 8.3 El argumento de venta más fuerte

No es *"la IA es mala"*. Es esto:

> *"Su equipo va a generar más código del que puede revisar. La evidencia dice
> que ~80 % de los PRs con IA se mergean sin revisión explícita y que los
> agentes violan 43 % de las políticas del propio repositorio. Yo diseño el
> control que hace que eso no pase."*

Eso vende sobre un riesgo verificable, no sobre una opinión.

---

## 9. Qué se puede probar sin pagar

| Herramienta | Acceso | Qué mediría |
|---|---|---|
| **Copilot cloud agent** | $10/mes (Pro) | el registro: commits firmados, co-author, log de sesión, eventos de auditoría |
| **Kiro** | **free, 50 créditos** | el flujo spec-first: `requirements.md` → `design.md` → `tasks.md` |

**Experimento:** mismo cambio pequeño por los dos, comparando **el registro
que deja cada uno**, no la velocidad.

Métricas, las que la literatura dice que importan:
```
· ¿cumple las reglas del repo, o solo pasa los tests?
· ¿qué introduce en análisis estático? (SonarQube antes/después)
· ¿la descripción del PR coincide con el código? (45,4 % no lo hace)
· ¿cuánto tiempo toma REVISARLO?  ← el número que nadie publica
```

---

## 10. Preguntas de demo

Las cinco del artículo, que son buenas y la literatura respalda:

1. ¿Qué etapas requieren un clic humano y cuáles corren sin uno?
2. Si cambia un artefacto aguas arriba, ¿qué pasa con las aprobaciones aguas abajo?
3. ¿Dónde corren los agentes y qué sale de mi red?
4. ¿Puedo exportar el registro completo de un cambio, de la solicitud al merge?
5. ¿Qué impide que un agente llegue a credenciales de producción o comandos de deploy?

**Cinco más, derivadas de la evidencia:**

6. ¿Qué porcentaje de los PRs que genera se descarta? (la aceptación varía
   66,1 %–82,1 % **según tipo de tarea**, más que entre agentes — `2602.08915`)
7. ¿Cuánto tiempo humano consume revisar un PR generado vs. escrito?
8. ¿Cómo mide el cumplimiento de las reglas de mi repo, no solo que pasen los tests?
9. ¿Cómo detecta que la descripción del PR afirma cambios no implementados?
10. ¿Qué tasa de revert post-merge tiene en producción? (Codex 6,1 % vs Devin
    14,5 % — `2609.17598`)

---

## 11. Advertencias sobre las fuentes

| Fuente | Advertencia |
|---|---|
| **METR 19 %** | 🔴 **retirado por el propio METR** ("out of date"). Citar junto con la retractación o es atacable |
| `arXiv:2302.06590` (55,8 %) | 🔴 GitHub midiendo su producto, tarea greenfield de juguete. El más citado y el menos transferible |
| `arXiv:2410.12944` (21 %) | 🟠 Google sobre su tooling interno; IC amplio por admisión propia |
| `arXiv:2609.04208` | 🔴 **registered report**: declara método y resultados *esperados*. No citar conclusiones |
| `arXiv:2608.06640` | 🟠 empresa anonimizada → semi-vendor |
| `arXiv:2501.13282` (Zoominfo) | 🟠 publicado por la empresa usuaria, no por el vendor → semi-independiente |
| **DORA 2025** | 🟠 Google Cloud, autorreportado. No existe un DORA 2026 (`/research/2026/` → 404) |
| **Opsera/Forge** | 🔴 autoinformado. "2 semanas → ~1 hora" es 300×: la comparación no es equivalente |
| arXiv en general | puede no estar revisado por pares. Los citados aquí declaran metodología y tamaño de muestra |

**Base común de varios estudios:** dataset **AIDev** (`arXiv:2602.09185`) —
932.791 PRs agénticos, 5 agentes, 116.211 repos, 72.189 devs. Que varios
papers compartan dataset significa que **no son replicaciones independientes**.

---

## 12. Fuentes descartadas, y por qué

Para que no se reintente:

| Fuente | Resultado |
|---|---|
| `facundoolano/software-papers` | 453 líneas de **clásicos** (Brooks, Parnas, Dijkstra, Wiener 1960). Solo 4 entradas tocan IA; nada de 2024-26 |
| `github.com/topics/ai-automation` | 2.423 repos, el #1 es un awesome-list de plantillas n8n. Topic residual |
| `github.com/topics/emprendimiento` | **26 repos**; el #1 tiene 4 ⭐ y 3.186 días sin commits |
| `github.com/topics/business-modeling` | **15 repos**; el #1 tiene 8 ⭐ y 2.074 días sin commits |
| `EdoStra/Marketing-for-Founders` (7.002 ⭐) | **awesome-list**: 271 enlaces, ~16 % de prosa propia. Útil como inventario de canales; **no tiene tácticas propias** |

**Patrón:** GitHub no es donde vive el conocimiento de negocio. Los topics de
estrategia comercial están vacíos o abandonados; la evidencia está en arXiv y
en encuestas de industria.
