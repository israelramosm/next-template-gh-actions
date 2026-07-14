# Plan de actualización y mejora — Next.js Template + GitHub Actions

> Fecha del análisis: 2026-07-13
> Decisión de base: **Bun será el motor principal** (package manager + runner de scripts), reemplazando a npm.

## Diagnóstico del estado actual

Template de Next.js (App Router, `src/`) con Flowbite React + Tailwind, tooling de calidad (ESLint/Prettier/Husky/lint-staged) y un único workflow que hace build estático y deploy a GitHub Pages en cada push a `main`.

Problemas encontrados:

| #   | Problema                                                                                                                                                                                                                                                                                                            | Impacto                                                                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | El script `lint` usa `next lint`, **eliminado en Next 16**                                                                                                                                                                                                                                                          | `bun run lint`, `lint:fix` y `lint:strict` están rotos                         |
| 2   | ESLint 9 instalado pero la config es legacy (`.eslintrc.json` + `.eslintignore`)                                                                                                                                                                                                                                    | Incompatible con flat config (default en ESLint 9, único formato en ESLint 10) |
| 3   | Tooling de desarrollo (eslint, prettier, husky, lint-staged, @typescript-eslint) declarado en `dependencies`                                                                                                                                                                                                        | Infla el árbol de producción; clasificación incorrecta                         |
| 4   | `npm audit` reporta **10 vulnerabilidades (4 high, 5 moderate, 1 low)**                                                                                                                                                                                                                                             | Riesgo de seguridad en dependencias transitivas                                |
| 5   | El workflow usa **Node 20, EOL desde abril 2026**, y detecta solo yarn/npm (no bun)                                                                                                                                                                                                                                 | CI corre sobre runtime sin soporte; no reconocerá `bun.lock`                   |
| 6   | No existe CI de PRs: ni lint, ni typecheck, ni build de validación                                                                                                                                                                                                                                                  | Todo se valida recién al hacer push a `main` (que además despliega)            |
| 7   | `next.config.mjs` está vacío; el `output: 'export'` y `basePath` los inyecta `configure-pages` en CI                                                                                                                                                                                                                | El build local no es equivalente al de CI; comportamiento "mágico" oculto      |
| 8   | `tsconfig.json` mapea `@/*` → `./*`, obligando a imports como `@/src/util/types`                                                                                                                                                                                                                                    | Convención rara; lo estándar con `src/` es `@/*` → `./src/*`                   |
| 9   | `.huskyrc` obsoleto (husky 9 usa `.husky/`) y `prepare: husky install` deprecado                                                                                                                                                                                                                                    | Config muerta y warning en cada install                                        |
| 10  | `NavbarPage` usa `src="images/next.svg"` (ruta relativa sin `/`)                                                                                                                                                                                                                                                    | Se rompe en subrutas y con el `basePath` de GitHub Pages                       |
| 11  | Sin tests ni framework de testing                                                                                                                                                                                                                                                                                   | Un template debería traer al menos la base de testing lista                    |
| 12  | README genérico de create-next-app; metadata del layout sigue siendo "Create Next App"                                                                                                                                                                                                                              | No documenta nada del template real (bun, deploy a Pages, scripts)             |
| 13  | Inconsistencias menores: `tailwind.config` declara fuentes Graphik/Merriweather que nunca se cargan (el layout usa Inter), `content` incluye `./src/pages/**` que no existe, `src/util/design-defaults.ts` está vacío, patrones `*/**/*` en lint-staged no cubren archivos del root, `h-[89vh]` como hack de layout | Ruido y deuda para quien clone el template                                     |

Dependencias desactualizadas (según `npm outdated`):

| Paquete                       | Actual        | Última        | Breaking                                             |
| ----------------------------- | ------------- | ------------- | ---------------------------------------------------- |
| next / eslint-config-next     | 16.0.10       | 16.2.10       | No (mismo major)                                     |
| react / react-dom             | 19.2.3        | 19.2.7        | No                                                   |
| tailwindcss                   | 3.4.19        | 4.3.2         | **Sí** (config CSS-first, `@tailwindcss/postcss`)    |
| flowbite-react                | 0.10.2        | 0.12.17       | **Sí** (nuevo sistema de temas, soporte Tailwind v4) |
| flowbite                      | 2.5.2         | 4.0.2         | **Sí**                                               |
| eslint                        | 9.39.2        | 10.7.0        | **Sí** (elimina eslintrc; requiere flat config)      |
| typescript                    | 5.9.3         | 7.0.2         | **Sí** (compilador nativo; evaluar)                  |
| lint-staged                   | 16.2.7        | 17.0.8        | Menor                                                |
| @types/node                   | 25.0.1        | 26.1.1        | Alinear con Node de CI                               |
| prettier / plugin-tailwindcss | 3.7.4 / 0.7.2 | 3.9.5 / 0.8.0 | No                                                   |

---

## Fase 0 — Migrar el motor a Bun

- [ ] Generar `bun.lock` con `bun install` y **eliminar `package-lock.json`**.
- [ ] Añadir `"packageManager": "bun@<versión>"` y campo `engines` en `package.json`.
- [ ] Reemplazar usos de `npx` por `bunx` (hook de husky: `bunx lint-staged`).
- [ ] Documentar en README que el proyecto usa bun (`bun install`, `bun run dev`, etc.).
- [ ] Verificar que `bun install` + `bun run build` + `bun run dev` funcionan de punta a punta.

## Fase 1 — Reparar lo que está roto hoy

- [ ] **Scripts de lint**: `next lint` ya no existe en Next 16. Reemplazar por ESLint CLI directo (`eslint .`, `eslint . --fix`) y añadir script `typecheck` (`tsc --noEmit`).
- [ ] **Migrar ESLint a flat config**: crear `eslint.config.mjs` usando los presets flat de `eslint-config-next` 16 + typescript-eslint + prettier; eliminar `.eslintrc.json` y `.eslintignore` (los ignores pasan a la propiedad `ignores`).
- [ ] **Reclasificar dependencias**: mover eslint, prettier, husky, lint-staged, @typescript-eslint/* y plugins de prettier a `devDependencies`.
- [ ] **Husky**: eliminar `.huskyrc` (obsoleto) y cambiar `prepare` de `husky install` a `husky`.
- [ ] **Vulnerabilidades**: actualizar dependencias dentro del mismo major (next 16.2.x, react 19.2.7, etc.) y re-auditar hasta limpiar los 4 high.
- [ ] **tsconfig paths**: cambiar `@/*` → `./src/*` y actualizar los imports (`@/src/util/types` → `@/util/types`).
- [ ] **Assets**: corregir `src="images/next.svg"` → `/images/next.svg` y revisar que las rutas respeten `basePath` en Pages (usar `assetPrefix`/`basePath` o `next/image` con rutas absolutas).
- [ ] **next.config.mjs explícito**: declarar `output: 'export'` e `images: { unoptimized: true }` (y `basePath` comentado/documentado) para que el build local sea idéntico al de CI, en lugar de depender de la inyección de `configure-pages`.
- [ ] **lint-staged**: corregir patrones `*/**/*` → `**/*` y quitar el doble pase de eslint (`--fix` + eslint plano).

## Fase 2 — Actualizar dependencias mayores

Orden sugerido (cada punto es un commit/PR verificable con build + lint + smoke test):

- [ ] Minors seguros primero: next 16.2.x, react 19.2.7, prettier 3.9, @typescript-eslint 8.64, lint-staged 17, @types/* alineados.
- [ ] **Tailwind CSS 3 → 4**: migrar a config CSS-first (`@import "tailwindcss"` en `globals.css`, `@theme` para fuentes/breakpoints), reemplazar plugin de PostCSS por `@tailwindcss/postcss`, eliminar `tailwind.config.ts` o reducirlo a lo que Flowbite necesite, actualizar `prettier-plugin-tailwindcss` a 0.8.
- [ ] **Flowbite React 0.10 → 0.12 + flowbite 4**: requerido para compatibilidad con Tailwind 4; migrar el theming custom (`customNavbarTheme`, `DeepPartial<FlowbiteNavbarTheme>`) al nuevo sistema de temas.
- [ ] **ESLint 9 → 10**: solo después de tener flat config estable; verificar compatibilidad de `eslint-config-next` y `eslint-plugin-prettier` con ESLint 10 antes de subir.
- [ ] **TypeScript 5.9 → 7 (nativo)**: evaluar en rama aparte; si algo del ecosistema (plugin de Next para tsserver, typescript-eslint) aún no lo soporta bien, quedarse en la última 5.x/6.x y dejarlo anotado.

## Fase 3 — GitHub Actions

- [ ] **Nuevo workflow `ci.yml`** para `pull_request` (y `push` a ramas ≠ main): install con bun → lint → typecheck → build. Con `concurrency` + `cancel-in-progress: true` y `timeout-minutes`.
- [ ] **Rehacer `nextjs.yml` (deploy a Pages)**:
  - Eliminar el paso "detect package manager" (ya no aplica: bun fijo).
  - Usar `oven-sh/setup-bun@v2` + `bun install --frozen-lockfile`.
  - Mantener `actions/setup-node` solo si el build lo requiere, con **Node 22 o 24 LTS** (Node 20 está EOL).
  - Actualizar `actions/checkout` a v5.
  - Mantener cache de `.next/cache` (ajustar la key: `bun.lock` en lugar de `package-lock.json`).
  - Conservar `configure-pages` para el `basePath` automático, pero con el `output: 'export'` ya explícito en el repo (Fase 1).
- [ ] **Automatizar actualizaciones**: Dependabot o Renovate cubriendo `github-actions` y dependencias de bun (verificar soporte de `bun.lock`; Renovate lo soporta bien).
- [ ] **Seguridad en CI** (opcional pero recomendado para un template): `dependency-review-action` en PRs y CodeQL para JS/TS.
- [ ] Fijar `permissions` mínimos por workflow (el de deploy ya está bien; replicar el criterio en los nuevos).

## Fase 4 — Calidad del template

- [ ] **Testing**: añadir Vitest + React Testing Library (o `bun test` si se quiere todo-bun) con 1–2 tests de ejemplo por componente, y sumar el paso al CI.
- [ ] **README real**: qué es el template, stack (Next 16, Tailwind 4, Flowbite, bun), scripts disponibles, cómo funciona el deploy a Pages, cómo usarlo como plantilla.
- [ ] **Limpieza**: eliminar `src/util/design-defaults.ts` (vacío), quitar `./src/pages/**` del content de Tailwind (si sobrevive la config), alinear las fuentes (o se cargan Graphik/Merriweather con `next/font` o se elimina su declaración y queda Inter).
- [ ] **Metadata**: título/description reales en `layout.tsx` en lugar de "Create Next App"; añadir `metadataBase`.
- [ ] **Layout**: reemplazar `h-[89vh]` por un layout flex (`min-h-dvh` + `flex-1`) para que el footer no dependa de un número mágico.
- [ ] Añadir `.editorconfig` y archivo de versión de runtime (`.bun-version` o `engines`) para consistencia entre entornos.

---

## Orden de ejecución y riesgos

1. **Fase 0 y Fase 1 van primero y juntas** — son correcciones de cosas rotas y de bajo riesgo; dejan el repo en estado sano y sobre bun.
2. **Fase 3 (CI) antes que Fase 2** — conviene tener el workflow de CI validando lint/typecheck/build _antes_ de meter los upgrades con breaking changes, para que cada bump se valide solo.
3. **Fase 2 en PRs separados por paquete** — Tailwind 4 + Flowbite 0.12 deben ir juntos (dependen entre sí); ESLint 10 y TypeScript 7 son independientes y opcionales si el ecosistema aún no acompaña.
4. **Fase 4 al final** — mejoras de template que no bloquean nada.

Riesgos principales: la migración Tailwind 4 + Flowbite es el cambio más invasivo (theming y clases pueden cambiar visualmente — validar las 3 páginas manualmente); TypeScript 7 es muy nuevo y puede romper tooling del editor; verificar que GitHub Pages siga sirviendo bien los assets tras tocar `basePath`/rutas de imágenes.
