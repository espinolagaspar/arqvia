# Prompt — Refactor visual ARQVIA (Next.js)

Vas a refactorizar la landing y las páginas públicas de ARQVIA para que coincidan con el diseño aprobado. El diseño de referencia está en `ArqVia Landing.dc.html` (adjunto). Respetá exactamente la estructura, el copy, los colores, la tipografía y el espaciado que se describen abajo.

## Antes de tocar código

1. Leé `AGENTS.md`. Esta versión de Next (16.2.6) tiene cambios incompatibles con versiones anteriores, así que revisá `node_modules/next/dist/docs/` antes de usar cualquier API (metadata, `next/font`, `next/image`, rutas dinámicas, `params` async).
2. Recorré `src/app`, `src/components`, `src/lib`, `src/types`.
3. No rompas el admin (`/admin`, `src/app/api/admin`, `src/lib/*/store.ts`, `src/components/admin/*`), el login, el Blob store ni el `proxy.ts`.
4. Trabajá en una branch nueva (`refactor/visual`). Hacé commits chicos, uno por bloque.

## Reglas

- No inventes información. Los únicos datos publicables son: **5 años**, **fabricación propia / taller propio**, **instalación incluida**, **diseño 3D sin cargo**, **render en 48–72 hs**, **herrajes europeos**, **CABA y GBA**.
- Eliminá todo dato que no esté en esa lista: "100+ proyectos", "100%", "propuesta en 24hs", "garantía", "Cero compromiso", etc. También los barrios y años de `SEED_PROJECTS`.
- Sacá del posicionamiento todo lo de LED / USB / carga Qi / gamer / "tecnológico", tanto en el copy como en la metadata.
- Nada de gradientes decorativos, glassmorphism, cards SaaS, íconos de lucide decorativos ni verde WhatsApp en la interfaz.
- Mobile first. Todo tiene que funcionar desde 360px hasta 1920px.
- Performance: usá `next/image` con `sizes` correctos en todas las imágenes. Cargá con `priority` solo la foto del hero. Pasá las imágenes de `public/images` a WebP/AVIF. Usá framer-motion solo donde haga falta (fade + translate de 12–16px al entrar en viewport, `once: true`).

## Tokens (reemplazar `@theme` en `globals.css`)

```css
@theme {
  --color-arq-bone: #F1EDE6;      /* fondo principal */
  --color-arq-ink: #1A1917;       /* texto principal y sección oscura */
  --color-arq-stone: #5F5A52;     /* texto secundario sobre bone */
  --color-arq-stone-light: #B3ACA1; /* texto secundario sobre ink */
  --color-arq-sand: #D9D3C9;      /* fondo de placeholders de imagen */
  --color-arq-wood: #8B6A4A;      /* acento, uso mínimo: numerales del proceso y hovers */
  --color-arq-line: rgba(26,25,23,0.16);
  --font-serif: var(--font-newsreader);
  --font-sans: var(--font-geist-sans);
}
```

- Eliminá las utilidades viejas (`glass`, `glow-*`, `text-gradient-*`, `led-line*`, `rule-accent`) solo después de verificar con `grep` que nadie las usa fuera del admin. Si el admin las usa, dejalas en un archivo aparte (`admin.css`) importado solo en `src/app/admin/layout.tsx`.
- Agregá `a:hover { color: var(--color-arq-wood) }` y `::selection { background:#1A1917; color:#F1EDE6 }`.
- Botones: sin border-radius (rectos), altura de 52px (56px en el CTA final), padding horizontal de 26–30px, 15px.
  - **Primario:** fondo ink, texto bone; hover con fondo wood.
  - **Sobre foto:** fondo bone, texto ink.
  - **Secundario:** texto con `border-bottom: 1px`, sin caja.

## Tipografía

- `next/font/google`: **Newsreader** (pesos 300 y 400, itálica 300, `opsz` automático) para títulos, y **Geist** (300/400/500) para el texto.
- **Títulos de sección:** serif 300, `clamp(38px, 5.4vw, 80px)`, `line-height: 1`, `letter-spacing: -0.02em`.
- **H1 del hero:** serif 300, `clamp(46px, 8.2vw, 124px)`, `line-height: 0.98`, `text-wrap: balance`.
- **Etiquetas:** Geist, 11px, mayúsculas, `letter-spacing: 0.18em`, color stone. Formato: "01 — Proyectos".
- **Texto:** 15px, `line-height: 1.6`, color stone, `text-wrap: pretty`.
- **Logo:** "ARQVIA" en Geist 500, 14px, `letter-spacing: 0.22em`. Reemplaza el ARQ/VIA de dos pesos.

## Layout base

- Contenedor: `max-width: 1440px`, padding horizontal `clamp(20px, 4vw, 56px)`. Reemplaza `container-arq`.
- Padding vertical de las secciones: `clamp(80px, 11vw, 160px)`.
- Separadores: solo líneas de 1px (`--color-arq-line` o ink sólido para enfatizar).

## Estructura

### `layout.tsx`
- `<body>` con fondo bone y texto ink. Quitá la clase `dark`.
- Mantené `Header`, `Footer` y `WhatsAppButton` (refactorizados).

### `Header` (refactor)
- Fijo, 64px de alto, fondo `rgba(241,237,230,0.92)` con `backdrop-blur`, borde inferior en line.
- **Desktop (≥820px):**
  - Logo a la izquierda.
  - Nav: Proyectos · Servicios · Nosotros · Contacto (14px, gap de 36px).
  - A la derecha, link "WhatsApp ↗" con `border-bottom`.
- **Mobile:** logo, link "WhatsApp" y botón de texto "Menú"/"Cerrar".
  - El menú es un overlay a pantalla completa en bone, con los links en serif 300 de 44px separados por líneas.
  - Abajo, el botón "Hablar por WhatsApp" (ink, 52px) y la línea "CABA y GBA · arqvia.service@gmail.com".
- Quitá `AdminLoginModal` y "Cotizar" del header público. Al admin se entra solo por `/admin/login`.
- Los links del nav apuntan a anclas de la home (`/#proyectos`, `/#servicios`, `/#nosotros`, `/#contacto`) con offset de 64px (`scroll-margin-top: 64px` en las secciones).

### Home (`src/app/page.tsx`), en este orden

1. **Hero:** `padding-top: 64px`.
   - Foto a sangre: `height: calc(100svh - 64px)`, `min-height: 560px`, `max-height: 1000px`, `object-fit: cover`, `priority`.
   - Scrim: `linear-gradient(180deg, transparent 40%, rgba(20,19,17,.62) 100%)`.
   - Contenido abajo a la izquierda, en color `#F6F3EE`:
     - H1 "Muebles que transforman espacios."
     - Subtítulo (máx. 480px): "Diseñamos, fabricamos e instalamos mobiliario a medida para cocinas, vestidores, livings y espacios de trabajo."
     - CTAs: "Ver proyectos →" (botón bone, lleva a `#proyectos`) y "Hablemos de tu proyecto" (link subrayado, abre WhatsApp).
   - Abajo a la derecha, caption en mayúsculas de 12px con nombre y tipo del proyecto de la foto.
   - Eliminá las stats, el indicador de scroll y la composición geométrica.

2. **Proyectos** (`id="proyectos"`):
   - Etiqueta "01 — Proyectos", título "Proyectos seleccionados".
   - A la derecha: "Cada proyecto se diseña para un espacio y una forma de usarlo."
   - Grilla editorial con los 3 primeros proyectos destacados:
     - Proyecto 1 a todo el ancho, con alto `clamp(380px, 52vw, 800px)`.
     - Debajo, una fila con nombre (serif 300, `clamp(28px, 3vw, 40px)`) + tipo (etiqueta) a la izquierda y el resumen (máx. 460px) a la derecha.
     - Después, un `flex-wrap` con el proyecto 2 (`flex: 7 1 420px`, alto `clamp(420px, 46vw, 740px)`) y el proyecto 3 (`flex: 5 1 320px`, alto `clamp(380px, 36vw, 560px)`, `padding-top: clamp(0px, 9vw, 160px)` para desfasarlo).
   - Cada proyecto completo es un `<Link href="/proyectos/[slug]">`. Hover: zoom de la imagen a `scale(1.03)` en 700ms.
   - Reemplaza a `Gallery` y `FeaturedProducts` en la home.

3. **Qué hacemos** (`id="servicios"`):
   - Etiqueta "02 — Qué hacemos". Título serif `clamp(32px, 4.2vw, 60px)`: "Nos ocupamos del mueble de principio a fin: lo diseñamos, lo fabricamos y lo instalamos."
   - Grilla `auto-fit minmax(260px, 1fr)` con 3 columnas. Cada una con `border-top: 1px` ink y título serif de 30px:
     - **Diseño:** "Te presentamos el mueble en 3D antes de fabricarlo. Sin cargo."
     - **Fabricación:** "Producimos en taller propio, con herrajes europeos."
     - **Instalación:** "Incluida en cada proyecto. Trabajamos en CABA y GBA."
   - Debajo, en una línea de 14px stone con `flex-wrap`: Cocinas · Vestidores · Placares · Living · Dormitorios · Oficinas · Mobiliario integral · Proyectos especiales.
   - Reemplaza a `Differentials`.

4. **Materiales y terminaciones:**
   - Fondo ink, texto bone. Etiqueta "03 — Materiales", título "Materiales y terminaciones".
   - A la derecha: "Elegimos cada material con vos, según el uso, el espacio y el presupuesto."
   - Tira horizontal con scroll y `scroll-snap`, sin scrollbar visible. Tiles de `clamp(240px, 24vw, 340px)` con imagen 4:5 (fondo `#2A2723` mientras no haya foto), numeral, nombre en serif de 26px y una línea en stone-light:
     1. **Melamina:** "Lisos y texturas madera, para uso diario intenso."
     2. **Enchapados:** "Chapa de madera natural sobre tablero."
     3. **Laqueados:** "Superficies continuas, mate o brillantes, en el color que elijas."
     4. **Madera:** "Madera maciza para piezas y detalles."
     5. **Herrajes:** "Bisagras, correderas y guías europeas."
     6. **Sistemas de apertura:** "Push, gola, tirador integrado o puertas corredizas."
   - Datos en `src/lib/data/materials.ts`. Imágenes en `public/images/materiales/*.webp`. Si faltan, renderizá el placeholder de color sin romper.

5. **Proceso** (`id="proceso"`):
   - Etiqueta "04 — Proceso", título "De la idea a la instalación".
   - `<ol>` en grilla `auto-fit minmax(200px, 1fr)`. Cada paso con `border-top`, numeral serif 300 de `clamp(48px, 5vw, 72px)` en wood, título Geist 500 de 17px y una línea:
     - 01 **Idea:** "Nos contás qué necesitás y cómo usás el espacio."
     - 02 **Diseño:** "Te presentamos la propuesta en 3D, sin cargo, en 48–72 hs."
     - 03 **Relevamiento:** "Medimos el espacio para fabricar a medida exacta."
     - 04 **Fabricación:** "Producimos cada pieza en nuestro taller."
     - 05 **Instalación:** "Instalamos y dejamos todo listo para usar."
   - Sin íconos. Reemplaza a `ProcessTimeline`.

6. **Nosotros** (`id="nosotros"`):
   - Dos columnas en `flex-wrap`: imagen 4:5 (foto del taller; placeholder sand si no hay) y texto.
   - Etiqueta "05 — Nosotros". Párrafo serif 300 de `clamp(28px, 3vw, 42px)`: "Hace cinco años que diseñamos y fabricamos muebles a medida. Hacemos todo el recorrido nosotros, así respondemos por el resultado de punta a punta."
   - Texto secundario provisorio, dejalo con un `TODO`.
   - Fila de 3 datos (serif 28px + descripción de 13px): "5 años / de trabajo", "Taller propio / fabricación", "CABA y GBA / zona de trabajo".

7. **CTA final** (`id="contacto"`), componente compartido (`ContactCTA`, reemplaza `CTAFinal`):
   - Título serif 300 `clamp(46px, 7.6vw, 120px)`: "¿Tenés un espacio para transformar?"
   - Botón "Hablar por WhatsApp →" (ink, 56px).
   - Al lado, en 14px stone: "Diseño 3D sin cargo · Render en 48–72 hs · Instalación incluida".
   - Sin formulario de cotización acá. `/cotizacion` sigue existiendo y se enlaza desde `/contacto`.

### `Footer` (refactor)
- Grilla `auto-fit minmax(200px, 1fr)`, con línea superior y sin íconos. Cuatro columnas:
  - Marca: "ARQVIA" + "Diseño, fabricación e instalación de mobiliario a medida. CABA y GBA."
  - Navegación: Proyectos, Servicios, **Piezas** (→ `/catalogo`), Nosotros.
  - Contacto: +54 9 11 3236-8891 (WhatsApp), arqvia.service@gmail.com, Instagram @arqvia.
  - "© ArqVia".

### `WhatsAppButton` (refactor)
- Aparece recién cuando el scroll pasa el 70% del alto del viewport.
- Pastilla fija abajo a la derecha: 44px de alto, fondo ink, texto bone de 14px "WhatsApp", con un punto de 6px `#7FAE8A` delante y sombra suave. Hover con fondo wood.
- Sin popup ni tooltip, y sin animación spring. Fade de 200ms.
- Se oculta cuando el menú mobile está abierto.
- El mensaje cambia según la página. Agregá un helper en `utils.ts`:
  - Home: "Hola ArqVia, quiero hablar de un proyecto."
  - Detalle: "Hola ArqVia, vi el proyecto {nombre} y quiero hablar de mi espacio."
- Mantené `formatWhatsAppUrl` y el número `5491132368891`.

### Detalle de proyecto (nuevo: `src/app/proyectos/[slug]/page.tsx`)
- Server component. Usá `generateStaticParams` si el store lo permite; si no, `dynamic`. Agregá `generateMetadata` con título, descripción y OG image tomada de la portada.
- Estructura:
  - Link "← Proyectos".
  - Etiqueta "{nº} · {tipo}".
  - H1 serif 300 `clamp(52px, 9vw, 140px)`.
  - Imagen principal a todo el contenedor, con alto `clamp(360px, 56vw, 860px)`.
  - Bloque en dos columnas:
    - `<dl>` con Tipo, Alcance ("Diseño, fabricación e instalación" o el `scope` del proyecto) y Materiales.
    - Resumen en serif `clamp(26px, 2.6vw, 38px)` + cuerpo de 16px stone.
  - Galería asimétrica: `flex-wrap` con `5 1 320px` (4:5) y `7 1 420px` (7:6), que se repite con el resto de `images[]`.
  - Link "Siguiente proyecto" con el nombre en serif grande, entre líneas.
  - `ContactCTA`.
- Respondé con `notFound()` si el slug no existe.

### `/proyectos` (refactor)
- Mismo header de sección que la home. Lista de todos los proyectos en formato índice: imagen 4:3 + numeral, tipo, nombre en serif grande, resumen y "Ver proyecto →", con líneas entre ítems.
- Eliminá las stats.
- El lightbox de `ProjectsGrid` pasa a la galería del detalle o se elimina; justificá la decisión en el PR.

### `/nosotros`, `/contacto`, `/catalogo`
- Aplicá los mismos tokens, tipografía y botones. Quitá íconos decorativos y cards glass.
- `/catalogo` queda con el nombre visible "Piezas", fuera del nav principal y enlazada desde el footer. No la elimines. Quitá de sus cards los badges LED/USB/Qi.

## Modelo de datos

En `src/types/index.ts`, agregá a `Project`:

```ts
slug: string;          // único, kebab-case
type: string;          // "Cocina integral", "Vestidor", ...
summary: string;       // una línea para cards
body?: string;         // texto largo del detalle
materials?: string[];  // ["Laqueado mate", "Herrajes europeos"]
scope?: string[];      // ["Diseño","Fabricación","Instalación"]
featured?: boolean;    // aparece en la home
order?: number;
```

- Mantené los campos existentes por compatibilidad. Marcá como `@deprecated` `accentColor`, `gradient`, `tags`, `location` y `year`, sin borrarlos todavía.
- En `getProjects()`, normalizá los datos viejos del Blob: si falta `slug`, generalo desde `title`; si falta `summary`, usá `description` recortada; si falta `type`, usá `category`.
- Actualizá `ProjectForm` y las actions del admin con los campos nuevos: inputs para slug, tipo, resumen y cuerpo, tags para materiales, checkboxes para alcance y un toggle "Destacado".
- Reemplazá `SEED_PROJECTS` por estos 3 proyectos de ejemplo, sin ubicación ni año y marcados con un comentario `// MOCK`:
  1. `cocina-negra` · "Cocina Negra" · Cocina integral · "Frentes negro mate, columnas hasta el techo y luz lineal bajo alacena." · materiales: Laqueado mate, Herrajes europeos, Apertura con gola · imagen `cocina-modular-led`
  2. `vestidor-vidrio` · "Vestidor Vidrio" · Vestidor · "Puertas de vidrio con perfilería negra, interior iluminado y cajoneras a medida." · Melamina, Perfilería de aluminio, Puertas corredizas · imagen `placard-moderno-led`
  3. `living-flotante` · "Living Flotante" · Mueble de living · "Rack suspendido de lado a lado, panel ranurado y cajones con apertura push." · Enchapado, Melamina, Apertura push · imagen `mueble-tv-flotante`

## SEO

- **Metadata global:**
  - Título por defecto: "ARQVIA — Diseño, fabricación e instalación de muebles a medida". Template: "%s | ARQVIA".
  - Descripción: "Diseñamos, fabricamos e instalamos mobiliario a medida: cocinas, vestidores, placares, living, dormitorios y oficinas. CABA y GBA."
  - Keywords: muebles a medida, cocinas a medida, vestidores, placares, mobiliario integral, Buenos Aires.
- Mantené `locale es_AR`, robots, favicon y Twitter card. Agregá `metadataBase` y una `opengraph-image` estática (foto del hero + logo).
- `sitemap.ts`: sumá las rutas `/proyectos/[slug]`.
- JSON-LD `LocalBusiness` en la home, solo con nombre, email, teléfono, área servida (CABA y GBA) y Instagram. Sin dirección ni horarios inventados.
- Un solo `<h1>` por página. `alt` descriptivos en todas las imágenes.

## Componentes

- **Nuevos:**
  - `components/home/`: `hero-image.tsx`, `featured-projects.tsx`, `services.tsx`, `materials-strip.tsx`, `process-steps.tsx`, `about-block.tsx`
  - `components/shared/`: `contact-cta.tsx`, `section-label.tsx`, `reveal.tsx` (wrapper de framer-motion)
  - `components/proyectos/`: `project-detail.tsx`, `project-index.tsx`
- **Refactorizar:** `header.tsx`, `footer.tsx`, `whatsapp-button.tsx`, `globals.css`, `layout.tsx`, `page.tsx`, `proyectos/page.tsx`, `nosotros/page.tsx`, `contacto/page.tsx`, `catalogo/*`, `types/index.ts`, `lib/data/projects.ts`, `lib/projects/store.ts`, `admin/project-form.tsx`, `sitemap.ts`.
- **Retirar de la home** (borrar solo si no se usan en otro lado): `differentials.tsx`, `gallery.tsx`, `featured-products.tsx`, `process-timeline.tsx`, `cta-final.tsx`, `led-badge.tsx`, `section-header.tsx`.

## Entrega

1. `npm run lint` y `npm run build` sin errores.
2. Revisá a 360, 390, 768, 1024, 1440 y 1920px. No puede haber scroll horizontal (salvo la tira de materiales), el texto no se puede superponer con la foto del hero y los hit targets tienen que ser de 44px o más.
3. Lighthouse mobile: Performance ≥ 90, CLS < 0.05, LCP < 2.5s (hero con `priority` y `sizes="100vw"`).
4. Verificá que el admin crea, edita y borra proyectos con los campos nuevos y que el detalle se actualiza.
5. Entregá un resumen del PR con: qué se conservó, qué se refactorizó, qué se retiró y por qué, y la lista de imágenes reales que faltan (hero, taller, 6 materiales y galerías de cada proyecto).
