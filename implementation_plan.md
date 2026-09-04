# Plan de Implementación: Invitación Web Interactiva Monsters Inc (Cumpleaños 1 Año Ana Lucía)

Desarrollo completo de la aplicación web interactiva cinemática en primera persona (POV Sulley) para la invitación de cumpleaños de Ana Lucía, siguiendo las directrices de [`docs/spec.md`](file:///c:/PROYECTOS/InvitacionMonsterInc/docs/spec.md) y [`skills/SKILL.md`](file:///c:/PROYECTOS/InvitacionMonsterInc/skills/SKILL.md).

## 🎯 Arquitectura y Enfoque

- **Stack Técnico**: HTML5 Semántico + CSS3 Moderno (Custom Properties, Glassmorphism, 100dvh) + JavaScript Vanilla ES Modules + GSAP 3 (Core + Easing) + Canvas Confetti + Web Audio API (Sintetizador + FX procedurales y de baja latencia).
- **Diseño**: Mobile-First (9:16 / 100dvh con marco emulador elegante en pantallas de escritorio).
- **Máquina de Estados (FSM)**:
  - `STATE_INTRO` (Estación de la Fábrica con luz de puerta y garras Sulley respirando)
  - `STATE_WALK_TO_DOOR` (Animación de pasos pesados *camera bobbing* hacia la puerta)
  - `STATE_OPEN_DOOR` (Garra abre la manija, giro 3D de la puerta, revelación de luz mágica)
  - `STATE_ROOM_APPROACH` (Acercamiento sigiloso a la cuna/habitación de Ana Lucía)
  - `STATE_WAKE_UP_SURPRISE` (¡Despertar alegre, risas, Sulley celebrando y explosión de confeti Monsters Inc!)
  - `STATE_INVITATION_CARD` (Tarjeta Glassmorphism con detalles de la fiesta, RSVP por WhatsApp, Google Maps y Calendario)

---

## 📂 Estructura de Archivos a Crear

```text
c:/PROYECTOS/InvitacionMonsterInc/
├── index.html              # Estructura semántica Mobile-First
├── css/
│   ├── main.css            # Tokens de diseño, variables CSS, reset y contenedor viewport
│   ├── scenes.css          # Estilos detallados de fábrica, puerta 3D, habitación y tarjeta
│   └── animations.css      # Keyframes CSS, efectos de brillo, pulso y garras
├── js/
│   ├── config.js           # Datos configurables de la fiesta (nombre, fecha, lugar, WhatsApp, colores)
│   ├── state-machine.js    # FSM para el control determinista de estados y transiciones
│   ├── audio.js            # Motor Web Audio API / FX procedurales (pisadas, pestillo, fanfarria, risa, ambiente)
│   ├── animations.js       # Timelines GSAP sincronizados (caminar, abrir puerta, despertar, confeti)
│   └── app.js              # Controlador principal, delegación de eventos táctiles y sonido
└── assets/
    ├── img/                # Ilustraciones vectoriales SVG / PNG para puerta, garras Sulley, habitación, badge
    └── sounds/             # Efectos de audio de soporte
```

---

## 🚀 Fases de Implementación

### Fase 1: Estructura Base, Configuración y Estilos (Tokens CSS)
- Crear [`js/config.js`](file:///c:/PROYECTOS/InvitacionMonsterInc/js/config.js) con los datos de Ana Lucía, WhatsApp, ubicación y paleta de colores.
- Crear [`css/main.css`](file:///c:/PROYECTOS/InvitacionMonsterInc/css/main.css), [`css/scenes.css`](file:///c:/PROYECTOS/InvitacionMonsterInc/css/scenes.css), y [`css/animations.css`](file:///c:/PROYECTOS/InvitacionMonsterInc/css/animations.css) con estética premium (colores temáticos turquesa `#00c4cc`, púrpura `#7c3aed`, verde Mike `#a3e635`, rosa Boo `#f472b6`).
- Crear [`index.html`](file:///c:/PROYECTOS/InvitacionMonsterInc/index.html) con estructura semántica, viewport `100dvh`, soporte de CDN para GSAP 3 y Canvas-Confetti.

### Fase 2: Motor de Audio Procedural y Assets Visuales (SVG & CSS Art)
- Crear [`js/audio.js`](file:///c:/PROYECTOS/InvitacionMonsterInc/js/audio.js) con Web Audio API para reproducir efectos de sonido ricos y libres de latencia (pisadas *thud*, pestillo mecánico *clack*, zumbido de fábrica, melodía de caja de música y fanfarria triunfal).
- Diseñar las capas visuales con SVG de alta fidelidad:
  - Fábrica de sustos con riel y luz de advertencia.
  - Puerta de flores blancas y rosas con marco metálico y manija dorada interactiva.
  - Garras peludas de Sulley en primer plano (POV).
  - Habitación de Boo con cuna y silueta tierna.
  - Badge oficial de Monsters Inc "Asustador Honorario" para la tarjeta.

### Fase 3: Máquina de Estados (FSM) y Timelines de Animación GSAP
- Crear [`js/state-machine.js`](file:///c:/PROYECTOS/InvitacionMonsterInc/js/state-machine.js) implementando los 6 estados del flujo y control de transición seguro.
- Crear [`js/animations.js`](file:///c:/PROYECTOS/InvitacionMonsterInc/js/animations.js) con GSAP 3:
  - `playIdleBreathing()`: Movimiento respiratorio orgánico de las garras de Sulley.
  - `playWalkToDoor()`: Balanceo de cámara con rebote orgánico (*camera bobbing*) y pasos coordinados con audio.
  - `playOpenDoor()`: Movimiento de garra hacia la manija, giro físico de manija y apertura 3D (`rotateY(-80deg)`) con luz mágica.
  - `playRoomApproach()`: Desplazamiento cinemático hacia la camita de Ana Lucía.
  - `playWakeUpSurprise()`: Animación de despertar, celebración de Sulley y ráfaga de confeti multicolor.
  - `playInvitationReveal()`: Entrada flotante con *glassmorphism* de la tarjeta final.

### Fase 4: Integración, Controlador de App y Acciones de Usuario
- Crear [`js/app.js`](file:///c:/PROYECTOS/InvitacionMonsterInc/js/app.js) para conectar los listeners de interacción táctil / click, control de sonido (Mute / Unmute), auto-rellenado de datos desde `config.js` y botones de acción (WhatsApp RSVP, Google Maps, Agregar al Calendario y Reiniciar Experiencia).

### Fase 5: Verificación y Pruebas
- Probar la interacción fluida en navegador emulando pantalla móvil y resolución desktop.
- Verificar transiciones entre estados, respuesta táctil, sincronización de audio y animación de confeti.

---

## 🔍 Plan de Verificación

### Pruebas Manuales y de Renderizado
1. **Flujo completo de principio a fin**:
   - Tocar la puerta $\rightarrow$ Paso y acercamiento.
   - Tocar la manija $\rightarrow$ Giro y apertura 3D.
   - Tocar la cuna $\rightarrow$ Acercamiento sigiloso.
   - Tocar a Ana Lucía $\rightarrow$ Despertar, confeti y fanfarria.
   - Revelación de la tarjeta $\rightarrow$ Comprobar enlace de WhatsApp, Maps y botón "Volver a ver".
2. **Control de Audio**:
   - Verificar que el toggle de sonido active/desactive audio sin errores por políticas de autoplay.
3. **Responsividad**:
   - Verificar en resoluciones móviles (375x667, 390x844, 412x915) y en desktop.
