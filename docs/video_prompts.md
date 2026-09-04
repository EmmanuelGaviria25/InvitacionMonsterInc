# Guía de Prompts de IA para Videos Cinemáticos (Monsters Inc - Ana Lucía 1er Añito)

Guía completa para generar los clips de video mediante herramientas de IA (Kling AI, Runway Gen-3, Luma Dream Machine, Sora, Pika o Hailuo/Minimax).

## ⚙️ Parámetros Generales
- **Relación de Aspecto:** `9:16` (Vertical / Mobile-First)
- **Estilo:** `3D Pixar animation, Monsters Inc universe, cinematic volumetric lighting, 8k render`
- **Punto de Vista:** `First-person POV (Sulley's perspective)`

---

## 🎬 1. Escena 1: Llegada de la Puerta (Fábrica)
- **Archivo sugerido:** `assets/videos/clip1_llegada_puerta.mp4`
- **Tipo:** Transición inicial (se reproduce una sola vez)
- **Duración:** 3 a 4 segundos
- **Prompt:**
```text
3D Pixar cinematic animation, Monsters Inc universe. First-person POV looking forward. In an industrial scare floor factory, Boo's iconic white wooden door decorated with pink hand-painted flowers smoothly arrives from an overhead metal track into the futuristic steel door clamp station. The red circular alarm light on top blinks softly. Two fluffy turquoise and purple-spotted monster paws (Sulley's hands) enter subtly at the bottom corners of the frame resting. Volumetric lighting, 8k render, hyper-detailed, vertical 9:16 aspect ratio.
```
- **Terminación del Clip:** La puerta encaja perfectamente en la estación. Conecta inmediatamente con la Escena 1.5 (Loop).

---

## 🔄 2. Escena 1.5: Espera Cíclica / Idle Loop (Esperando el Toque)
- **Archivo sugerido:** `assets/videos/clip1_idle_espera.mp4`
- **Tipo:** Loop cíclico infinito (`loop` activo hasta que el usuario toca la puerta)
- **Duración:** 2 a 3 segundos (perfectamente loopeable)
- **Prompt:**
```text
3D Pixar animation seamless loop, first-person POV stationary camera. Boo's white wooden door with pink flowers is resting fixed in the industrial steel station clamps. The red alarm light on top pulses gently on and off. At the bottom corners, large fluffy turquoise and purple monster paws (Sulley's hands) move subtly in a gentle idle breathing motion with small finger twitches. The factory background has soft ambient industrial haze and subtle light flicker. Seamless seamless loop, perfectly looping, vertical 9:16 aspect ratio.
```
- **Comportamiento en la Web:** Este clip se reproduce en bucle continuo (`loop`) con el indicador *"Toca la puerta para entrar"*. Al hacer clic/tap en la puerta, se detiene el loop e inicia la Escena 2.

---

## 🎬 3. Escena 2: Pasos Pesados hacia la Puerta (POV Sulley)
- **Archivo sugerido:** `assets/videos/clip2_caminar_puerta.mp4`
- **Tipo:** Acción interactiva tras tocar la puerta
- **Duración:** 2 a 3 segundos
- **Prompt:**
```text
3D Pixar animation, first-person POV shot. Starting from the stationary position looking at Boo's door, the camera moves forward taking 3 heavy, rhythmic monster footsteps with subtle organic camera bobbing and camera shake, walking directly towards Boo's white wooden door with pink flowers. Large turquoise furry monster paws swing naturally into frame with each heavy step. The camera ends in a dramatic close-up macro focus on the shiny golden door knob and keyhole. 8k, smooth cinematic lighting, vertical 9:16 aspect ratio.
```
- **Terminación del Clip:** Primer plano centrado en la manija dorada de la puerta esperando ser girada.

---

## 🎬 4. Escena 3: Giro de Manija y Apertura de Puerta
- **Archivo sugerido:** `assets/videos/clip3_abrir_puerta.mp4`
- **Tipo:** Acción interactiva tras tocar la manija
- **Duración:** 3 a 4 segundos
- **Prompt:**
```text
3D Pixar style cinematic video, first-person POV. A large, fluffy turquoise blue monster hand with purple spots and friendly claws reaches out and firmly grabs the shiny golden door handle. The monster turns the brass lever downward, pushing the white flower door open smoothly inward. A warm, glowing magical bedroom light floods into the camera from inside, revealing a cozy dark nighttime nursery bedroom in the background. Ultra high quality, smooth physical animation, vertical 9:16.
```
- **Terminación del Clip:** La puerta queda completamente abierta hacia el interior de la habitación con luz cálida.

---

## 🎬 5. Escena 4: Acercamiento Sigiloso a la Cuna
- **Archivo sugerido:** `assets/videos/clip4_acercar_cuna.mp4`
- **Tipo:** Entrada a la habitación
- **Duración:** 3 a 4 segundos
- **Prompt:**
```text
3D Pixar style animation, first-person POV creeping stealthily inside a cute toddler girl's bedroom. Soft purple and deep blue nighttime lighting with glowing stars on the walls. The camera slowly and gently glides closer to a pink decorated baby crib. Inside the crib, a super cute 1-year-old baby girl (wearing pink pajamas with two adorable Boo-style toddler pigtails) is sleeping peacefully under a soft blanket. Gentle, tender atmosphere, vertical 9:16 aspect ratio.
```
- **Terminación del Clip:** Enfoque cercano sobre la bebé durmiendo plácidamente.

---

## 🎬 6. Escena 5: ¡Despertar Alegre, Sulley y Sorpresa de Cumpleaños!
- **Archivo sugerido:** `assets/videos/clip5_despertar_sorpresa.mp4`
- **Tipo:** Clímax y revelación de invitación
- **Duración:** 3 a 4 segundos
- **Prompt:**
```text
3D Pixar style heartwarming animation. The cute 1-year-old baby girl with Boo pigtails wakes up smiling brightly and giggling with big joyful eyes, sitting up in her crib. Friendly Sulley the big turquoise fluffy monster appears wearing a cute pink party hat, raising his hands in joyful celebration holding a little birthday present. Colorful confetti (turquoise, purple, green, and pink) bursts into the air around them. Joyful party atmosphere, ultra-detailed 3D render, vertical 9:16 aspect ratio.
```
- **Terminación del Clip:** La bebé sonríe, Sulley festeja, cae el confeti y se despliega la tarjeta final de invitación.
