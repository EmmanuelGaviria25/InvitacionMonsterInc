---
name: sdd-monsters-invitation
description: >-
  Guía y procedimientos para implementar la invitación web interactiva de Monsters Inc
  (Cumpleaños 1 año Ana Lucía) siguiendo la metodología Spec-Driven Development (SDD),
  máquina de estados FSM, timelines GSAP en primera persona (POV Sulley) y diseño Mobile-First.
---

# Skill: Implementación SDD - Invitación Interactiva Monsters Inc

Esta skill contiene las directrices, componentes y flujos paso a paso para desarrollar y mantener la invitación interactiva de cumpleaños con temática de Monsters Inc basada en las especificaciones de `spec.md`.

## 🏗️ 1. Estructura de Proyecto Recomendada

```text
invitacion-monsters-inc/
├── index.html              # Estructura semántica Mobile-First (100dvh)
├── css/
│   ├── main.css            # Tokens de diseño, estilos base y responsive container
│   ├── scenes.css          # Estilos de fábrica, puerta 3D, habitación y tarjeta
│   └── animations.css      # Keyframes y utilidades de transición
├── js/
│   ├── config.js           # Datos configurables de la fiesta y colores
│   ├── state-machine.js    # FSM (Estados de la experiencia)
│   ├── animations.js       # Timelines GSAP (Pasos, giro de manija, apertura, confeti)
│   ├── audio.js            # Controlador de efectos de sonido y Web Audio
│   └── app.js              # Inicialización y control de eventos
├── assets/
│   ├── img/                # Capas visuales (puerta, habitación, garras Sulley, etc.)
│   └── sounds/             # Efectos de audio ligeros (.mp3 / .ogg)
└── docs/
    └── spec.md             # Especificación técnica SDD de referencia
```

---

## 🕹️ 2. Flujo de la Máquina de Estados (FSM)

Al codificar la interacción, siempre respetar los siguientes estados y transiciones:

1. **`STATE_INTRO`**:
   - Muestra la puerta en la fábrica con la luz roja parpadeando.
   - Garras de Sulley con animación *idle breathing* (`gsap.to('.paw', { y: '+=5', repeat: -1, yoyo: true })`).
   - Trigger: `click` en `#door-target` $\rightarrow$ Transición a `STATE_WALK_TO_DOOR`.

2. **`STATE_WALK_TO_DOOR`**:
   - Timeline GSAP de *Camera Bobbing* (balanceo en X, Y, Scale):
     ```javascript
     const walkTl = gsap.timeline({ onComplete: () => transitionTo('STATE_WALK_TO_DOOR_READY') });
     walkTl.to('#stage-viewport', { scale: 1.6, y: 50, duration: 1.2, ease: "power1.inOut" })
           .to('.paw', { y: 20, yoyo: true, repeat: 3, duration: 0.3 }, 0);
     ```
   - Trigger: `click` en `#door-handle` $\rightarrow$ Transición a `STATE_OPEN_DOOR`.

3. **`STATE_OPEN_DOOR`**:
   - Animación de la garra girando la manija (`rotate: 45deg`).
   - Apertura 3D de la puerta: `gsap.to('#door-leaf', { transformOrigin: 'left center', rotateY: -85, duration: 1.0, ease: 'power2.out' })`.
   - Transición visual de brillo $\rightarrow$ Activa `#scene-bedroom`.

4. **`STATE_ROOM_APPROACH`**:
   - Acercamiento suave a la cuna/cama de Boo/Ana Lucía.
   - Indicador pulsante sobre la bebé: *"¡Toca a Ana Lucía para darle su sorpresa!"*.

5. **`STATE_WAKE_UP_SURPRISE`**:
   - Despertar de la bebé sonriente + Sulley celebrando.
   - Disparo de confeti con paleta Monsters Inc (`#00c4cc`, `#7c3aed`, `#a3e635`, `#f472b6`).
   - Transición automática (2.5s) a `STATE_INVITATION_CARD`.

6. **`STATE_INVITATION_CARD`**:
   - Entrada de la tarjeta con efecto *glassmorphism* (`backdrop-filter: blur(12px)`).
   - Enlaces activos para WhatsApp (`wa.me/`), Google Maps y botón de reinicio.

---

## 🎨 3. Paleta de Colores y Tokens CSS

```css
:root {
  --color-sulley-cyan: #00c4cc;
  --color-sulley-purple: #7c3aed;
  --color-mike-green: #a3e635;
  --color-boo-pink: #f472b6;
  --color-door-wood: #fffaf0;
  --color-bg-dark: #0a0e17;
  --font-title: 'Outfit', 'Inter', sans-serif;
  --radius-card: 20px;
  --shadow-glow: 0 0 20px rgba(0, 196, 204, 0.4);
}
```

---

## 📋 4. Checklist de Verificación y Calidad

- [ ] ¿La interfaz se ajusta perfectamente a `100dvh` sin desbordamientos en móviles?
- [ ] ¿El audio requiere interacción previa del usuario (política de autoplay de navegadores)?
- [ ] ¿Los botones de WhatsApp y Google Maps se abren en pestañas nuevas con `rel="noopener noreferrer"`?
- [ ] ¿El botón "Volver a ver" reinicia el estado y los timelines de GSAP limpiamente?
