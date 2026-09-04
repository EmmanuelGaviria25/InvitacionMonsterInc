/**
 * animations.js
 * Confetti effects and entrance timelines for the invitation card
 */
import { PARTY_CONFIG } from './config.js';

class AnimationController {
  /* Disparar lluvia de confeti en pantalla completa con paleta rosada */
  fireConfetti() {
    if (typeof confetti === 'function') {
      const colors = [
        '#ff4088',
        '#ff70a6',
        '#f472b6',
        '#e879f9',
        '#fbbf24',
        '#ffffff'
      ];

      // Disparo central
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: colors,
        disableForReducedMotion: true
      });

      // Cañón izquierdo
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.7 },
          colors: colors
        });
      }, 250);

      // Cañón derecho
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.7 },
          colors: colors
        });
      }, 450);
    }
  }

  /* Revelar la tarjeta de invitación con efecto Glassmorphism suave */
  revealInvitationCard() {
    const overlay = document.getElementById('scene-invitation');
    if (!overlay) return;

    overlay.classList.remove('hidden');
    overlay.classList.add('active');

    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.invitation-card',
        { scale: 0.8, y: 60, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }
      );
    }

    this.fireConfetti();
  }

  /* Ocultar tarjeta al reiniciar */
  hideInvitationCard() {
    const overlay = document.getElementById('scene-invitation');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.classList.add('hidden');
    }
  }

  /* Animación continua de confeti suave cayendo en el fondo de bienvenida */
  startSplashFallingConfetti() {
    const canvas = document.getElementById('splash-confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth || 440;
    let height = canvas.height = canvas.offsetHeight || 920;

    // Solo colores cálidos, rosas, púrpuras suaves, dorados y blancos (cero azules/cianes)
    const colors = ['#ff4088', '#ff70a6', '#f472b6', '#fbcfe8', '#e879f9', '#fbbf24', '#fef08a', '#ffffff'];
    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 4 + 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngle: Math.random() * Math.PI,
        tiltAngleInc: Math.random() * 0.05 + 0.02,
        vy: Math.random() * 1.5 + 0.8,
        vx: Math.random() * 0.8 - 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      });
    }

    this.isSplashConfettiActive = true;

    const render = () => {
      if (!this.isSplashConfettiActive) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += p.vy;
        p.x += Math.sin(p.tiltAngle) * 0.6 + p.vx;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;

        // Dibujar forma de confeti rectangular y circular
        ctx.beginPath();
        if (p.r > 4) {
          ctx.arc(0, 0, p.r * 0.6, 0, Math.PI * 2);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.fill();
        ctx.restore();
      });

      this.splashAnimFrame = requestAnimationFrame(render);
    };

    render();
  }

  stopSplashFallingConfetti() {
    this.isSplashConfettiActive = false;
    if (this.splashAnimFrame) {
      cancelAnimationFrame(this.splashAnimFrame);
    }
  }
}

export const animationController = new AnimationController();
