# RecordaU - Página Web Oficial (Versión Local)

Página web oficial de **RecordaU** ("Recordatorio Universidad" / "Tu asistente académico inteligente"), desarrollada para visualización, pruebas de diseño, UX e internacionalización en entorno local.

---

## 📱 Identidad Visual del Proyecto

- **Paleta de Colores Oficial**:
  - `Primary`: `#3F51B5`
  - `PrimaryLight`: `#5C6BC0`
  - `PrimaryDark`: `#283593`
  - `Background`: `#EEF2FF`
  - `BackgroundSecondary`: `#F8FAFC`
  - `Success`: `#22C55E` | `Warning`: `#F59E0B` | `Danger`: `#EF4444` | `Info`: `#0EA5E9`
- **Gradiente Corporativo**: `#3F51B5` → `#5C6BC0` → `#EEF2FF`
- **Glassmorphism**: `backdrop-filter: blur(18px)`, bordes translúcidos (`rgba(255,255,255,0.314)`), radios de 22-25px y sombras suaves.
- **Tipografía**: `Inter` / `Roboto` (400, 500, 600, 700).

---

## 📁 Estructura del Proyecto

```text
pagina web recordaU/
│
├── index.html                  # Landing page principal (14 secciones completas)
│
├── auth/
│   └── confirmed.html          # Página de verificación de correo (/auth/confirmed.html)
│
├── css/
│   ├── styles.css              # Sistema de diseño, componentes, mockups, glassmorphism
│   └── responsive.css          # Media queries (Mobile first, tablet, desktop y reduced-motion)
│
├── js/
│   ├── translations.js         # Diccionario i18n completo (Español / English)
│   ├── animations.js           # Scroll reveal con IntersectionObserver y efectos 3D sutiles
│   └── main.js                 # Control de navegación, selector ES/EN, acordeón FAQ y formularios
│
├── assets/
│   ├── logo/
│   │   ├── recordau-logo.svg   # Logo vectorial oficial de RecordaU
│   │   └── favicon.svg         # Favicon e icono de la app
│   ├── images/                 # Espacio para capturas reales
│   └── video/                  # Espacio para videos demostrativos
│
└── README.md                   # Esta guía
```

---

## 🚀 Cómo Ejecutar la Página Localmente

No se requiere backend, base de datos ni instalación de dependencias pesadas. Puedes abrirla de dos formas:

### Opción 1: Servidor Local Ligero (Recomendado)
Abre PowerShell o terminal en esta carpeta y ejecuta cualquiera de los siguientes comandos:

**Con Python 3:**
```powershell
python -m http.server 8080
```
Luego abre en tu navegador:
👉 **[http://localhost:8080](http://localhost:8080)**

**Con Node.js / npx:**
```powershell
npx serve .
```

---

## 🌐 Páginas y Rutas Disponibles

1. **Página Principal (Landing Page):**
   - URL: `http://localhost:8080/index.html` (o `http://localhost:8080/`)
   - Incluye: Navbar con selector `ES | EN`, Hero con Mockup fiel a la app Flutter, Flujo del problema/solución, Demostración con tabs, 6 funciones principales, Línea temporal dedicada 12h/6h/2h, 4 pasos guiados, Compatibilidad amplia para educación superior, Seguridad y privacidad rigurosa, Sobre RecordaU, FAQ interactivo (10 preguntas), Descarga ("Próximamente"), Formulario de contacto y Footer.

2. **Página de Confirmación de Correo:**
   - URL: `http://localhost:8080/auth/confirmed.html`
   - Diseñada para redirigir a los usuarios tras verificar su correo electrónico en Supabase.
   - Cuenta con botón preparado para el deep-link `recordau://auth-callback` y soporte bilingüe.

---

## 🖼️ Estado de Placeholders y Recursos Futuros

| Componente | Estado Actual | Reemplazo Futuro |
| :--- | :--- | :--- |
| **Hero Phone Mockup** | UI renderizada fielmente en CSS/SVG | Se puede conservar o sustituir por captura real de Flutter |
| **Demostración Visual (4 pestañas)** | Placeholders visuales identificables | Capturas de pantalla o clips de video en `assets/images/` y `assets/video/` |
| **Botones de Descarga** | Badges activos con etiqueta "Próximamente" | Enlaces reales a Google Play y App Store cuando la app sea publicada |
| **Formulario de Contacto** | Validación local + disparador `mailto:` | Endpoint / backend de envío de correos cuando se defina hosting |

---

## 🔒 Privacidad y Regla Anti-invención
- No se han agregado métricas, universidades ni precios ficticios.
- La sección de seguridad refleja estrictamente el uso del navegador integrado y la protección de contraseñas.
