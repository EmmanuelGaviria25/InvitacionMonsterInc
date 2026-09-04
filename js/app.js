/**
 * app.js
 * Video-Driven Application Controller with Robust Audio Execution for All Scenes
 */
import { PARTY_CONFIG } from './config.js';
import { STATES, StateMachine } from './state-machine.js';
import { soundEngine } from './audio.js';
import { animationController } from './animations.js';

class VideoApp {
  constructor() {
    this.fsm = new StateMachine(STATES.INTRO_STATION);

    // Double buffered video elements
    this.videoA = document.getElementById('video-layer-a');
    this.videoB = document.getElementById('video-layer-b');
    this.activeVideo = this.videoA;
    this.idleVideo = this.videoB;

    // UI Elements
    this.cueEl = document.getElementById('interaction-cue');
    this.cueTextEl = document.querySelector('.cue-text');
    this.cueIconEl = document.querySelector('.cue-icon');
    this.soundBtn = document.getElementById('btn-sound-toggle');

    // DOM Audio Player for continuous birthday music loop
    this.birthdayAudio = document.getElementById('birthday-audio-player');
    if (!this.birthdayAudio) {
      this.birthdayAudio = new Audio(PARTY_CONFIG.audioAssets.birthdayMusic);
      this.birthdayAudio.loop = true;
    }
    this.birthdayAudio.loop = true;
    this.birthdayAudio.volume = 0.9;

    this.isMuted = false;
    this.hasUserInteracted = false;
    this.shouldPlayMusic = false;

    // Interaction Lock Flag
    this.canInteract = false;

    // Splash Screen Element
    this.splashEl = document.getElementById('splash-screen');
    this.startBtn = document.getElementById('btn-start-invitation');
  }

  init() {
    this.populatePartyDetails();
    this.bindEvents();
    this.setupStateListeners();

    // Iniciar lluvia de confeti continua en la pantalla de bienvenida
    animationController.startSplashFallingConfetti();
  }

  startInvitationExperience() {
    this.unlockAudio();
    animationController.stopSplashFallingConfetti();

    if (this.splashEl) {
      this.splashEl.classList.add('hidden');
    }

    // Iniciar con la escena de introducción con audio completamente desbloqueado
    this.playIntroSequence();
  }

  playIntroSequence() {
    this.canInteract = false;
    this.shouldPlayMusic = false;
    this.stopBirthdayMusic();
    animationController.hideInvitationCard();

    this.playSceneVideo(PARTY_CONFIG.videoAssets.introStation, {
      loop: false,
      onEnded: () => {
        this.fsm.transitionTo(STATES.IDLE_WAIT);
      }
    });
  }

  startBirthdayMusic() {
    this.shouldPlayMusic = true;
    if (this.birthdayAudio) {
      this.birthdayAudio.muted = this.isMuted;
      this.birthdayAudio.play().catch(err => {
        console.warn('[Audio] Autoplay pending interaction:', err);
      });
    }
  }

  stopBirthdayMusic() {
    this.shouldPlayMusic = false;
    if (this.birthdayAudio) {
      this.birthdayAudio.pause();
      this.birthdayAudio.currentTime = 0;
    }
  }

  /* Populate invitation data from config.js */
  populatePartyDetails() {
    const childNameEl = document.getElementById('inv-child-name');
    const ageEl = document.getElementById('inv-age-tag');
    const taglineEl = document.getElementById('inv-tagline');
    const dateEl = document.getElementById('inv-date');
    const timeEl = document.getElementById('inv-time');
    const locEl = document.getElementById('inv-location');

    if (childNameEl) childNameEl.textContent = PARTY_CONFIG.childName;
    if (ageEl) ageEl.textContent = `¡Cumple ${PARTY_CONFIG.age} Añito!`;
    if (taglineEl) taglineEl.textContent = PARTY_CONFIG.tagline;
    if (dateEl) dateEl.textContent = PARTY_CONFIG.date;
    if (timeEl) timeEl.textContent = PARTY_CONFIG.time;
    if (locEl) locEl.textContent = `${PARTY_CONFIG.location.name} - ${PARTY_CONFIG.location.address}`;

    // WhatsApp Link
    const btnWhatsApp = document.getElementById('btn-whatsapp');
    if (btnWhatsApp) {
      const encodedMsg = encodeURIComponent(PARTY_CONFIG.rsvp.messageTemplate);
      btnWhatsApp.href = `https://wa.me/${PARTY_CONFIG.rsvp.whatsappNumber}?text=${encodedMsg}`;
    }

    // Google Maps Link
    const btnMaps = document.getElementById('btn-maps');
    if (btnMaps) {
      btnMaps.href = PARTY_CONFIG.location.googleMapsUrl;
    }

    // Google Calendar Link
    const btnCalendar = document.getElementById('btn-calendar');
    if (btnCalendar) {
      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(PARTY_CONFIG.calendar.title)}&dates=${PARTY_CONFIG.calendar.startDate}/${PARTY_CONFIG.calendar.endDate}&details=${encodeURIComponent(PARTY_CONFIG.calendar.description)}&location=${encodeURIComponent(PARTY_CONFIG.location.name + ', ' + PARTY_CONFIG.location.address)}`;
      btnCalendar.href = calUrl;
    }
  }

  /* Setup FSM Transitions */
  setupStateListeners() {
    this.fsm.onStateChange((newState) => {
      console.log('>>> [FSM State]:', newState);

      switch (newState) {
        case STATES.INTRO_STATION:
          this.playIntroSequence();
          break;

        case STATES.IDLE_WAIT:
          this.canInteract = true;
          this.stopBirthdayMusic();
          this.playSceneVideo(PARTY_CONFIG.videoAssets.idleLoop, {
            loop: true,
            cueText: "Toca la puerta para entrar",
            cueIcon: "👆"
          });
          break;

        case STATES.TOUCH_DOOR:
          this.canInteract = false;
          this.hideCue();
          soundEngine.playDoorKnock();
          this.playSceneVideo(PARTY_CONFIG.videoAssets.touchDoor, {
            loop: false,
            onEnded: () => {
              this.fsm.transitionTo(STATES.WALK_TO_DOOR);
            }
          });
          break;

        case STATES.WALK_TO_DOOR:
          this.canInteract = false;
          this.hideCue();

          // Pisadas contundentes de monstruo
          soundEngine.playFootstep();
          setTimeout(() => soundEngine.playFootstep(), 650);
          setTimeout(() => soundEngine.playFootstep(), 1300);

          this.playSceneVideo(PARTY_CONFIG.videoAssets.walkToDoor, {
            loop: false,
            onEnded: () => {
              this.canInteract = true;
              this.updateCue("Gira la manija para abrir", "🔑");
            }
          });
          break;

        case STATES.OPEN_DOOR:
          this.canInteract = false;
          this.hideCue();
          soundEngine.playHandleClick();
          setTimeout(() => soundEngine.playDoorOpenMagic(), 350);

          this.playSceneVideo(PARTY_CONFIG.videoAssets.openDoor, {
            loop: false,
            onEnded: () => {
              this.fsm.transitionTo(STATES.ROOM_SLEEPING);
            }
          });
          break;

        case STATES.ROOM_SLEEPING:
          this.canInteract = false;
          this.hideCue();
          this.playSceneVideo(PARTY_CONFIG.videoAssets.babySleeping, {
            loop: false,
            onEnded: () => {
              this.canInteract = true;
              this.updateCue("¡Toca a Ana Lucía para darle su sorpresa!", "✨");
            }
          });
          break;

        case STATES.PARTY_CELEBRATION:
          this.canInteract = false;
          this.hideCue();
          this.startBirthdayMusic();
          this.playSceneVideo(PARTY_CONFIG.videoAssets.babyParty, {
            loop: false,
            onEnded: () => {
              this.fsm.transitionTo(STATES.INVITATION_CARD);
            }
          });
          break;

        case STATES.INVITATION_CARD:
          this.canInteract = true;
          this.hideCue();
          if (this.birthdayAudio && this.birthdayAudio.paused && !this.isMuted) {
            this.startBirthdayMusic();
          }
          animationController.revealInvitationCard();
          break;
      }
    });
  }

  /* Seamless Double-Buffered Video Switcher */
  playSceneVideo(videoSrc, { loop = false, onEnded = null, cueText = null, cueIcon = "👆" } = {}) {
    const nextVideo = this.idleVideo;
    const currentVideo = this.activeVideo;

    // Remove previous listeners
    currentVideo.onended = null;
    nextVideo.onended = null;

    nextVideo.src = videoSrc;
    nextVideo.loop = loop;

    // Mantener video desmuteado si el video contiene audio
    nextVideo.muted = !this.hasUserInteracted || this.isMuted;
    nextVideo.volume = 1.0;
    nextVideo.currentTime = 0;

    if (onEnded) {
      nextVideo.onended = () => {
        console.log('[Video] onEnded triggered for:', videoSrc);
        onEnded();
      };
    }

    const playPromise = nextVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          nextVideo.classList.add('active');
          currentVideo.classList.remove('active');

          setTimeout(() => {
            currentVideo.pause();
            currentVideo.currentTime = 0;
          }, 300);

          this.activeVideo = nextVideo;
          this.idleVideo = currentVideo;

          if (this.hasUserInteracted && !this.isMuted) {
            this.activeVideo.muted = false;
          }

          if (cueText) {
            this.updateCue(cueText, cueIcon);
          }
        })
        .catch(err => {
          console.warn('[Video] Play error:', err);
          nextVideo.muted = true;
          nextVideo.play().then(() => {
            nextVideo.classList.add('active');
            currentVideo.classList.remove('active');
            this.activeVideo = nextVideo;
            this.idleVideo = currentVideo;
            if (cueText) {
              this.updateCue(cueText, cueIcon);
            }
          });
        });
    }
  }

  /* Global User Tap / Click Handler on Stage */
  handleUserInteraction() {
    this.unlockAudio();

    if (!this.canInteract) {
      console.log('[User Interaction] Click ignored: Video is still playing');
      return;
    }

    const currentState = this.fsm.getState();
    console.log('[User Interaction] Allowed click on state:', currentState);

    switch (currentState) {
      case STATES.INTRO_STATION:
      case STATES.IDLE_WAIT:
        this.fsm.transitionTo(STATES.TOUCH_DOOR);
        break;

      case STATES.WALK_TO_DOOR:
        this.fsm.transitionTo(STATES.OPEN_DOOR);
        break;

      case STATES.ROOM_SLEEPING:
        this.fsm.transitionTo(STATES.PARTY_CELEBRATION);
        break;

      default:
        break;
    }
  }

  unlockAudio() {
    this.hasUserInteracted = true;
    soundEngine.ensureContext();

    if (this.activeVideo && !this.isMuted) {
      this.activeVideo.muted = false;
      this.activeVideo.volume = 1.0;
    }
    if (this.idleVideo && !this.isMuted) {
      this.idleVideo.muted = false;
      this.idleVideo.volume = 1.0;
    }
    if (this.shouldPlayMusic && this.birthdayAudio && !this.isMuted) {
      this.birthdayAudio.muted = false;
      if (this.birthdayAudio.paused) {
        this.birthdayAudio.play().catch(e => console.warn(e));
      }
    }
  }

  /* Bind DOM Event Listeners */
  bindEvents() {
    // Global User Interaction to unlock AudioContext on the very first touch/click
    const unlockHandler = () => {
      soundEngine.ensureContext();
      document.removeEventListener('pointerdown', unlockHandler);
      document.removeEventListener('touchstart', unlockHandler);
    };
    document.addEventListener('pointerdown', unlockHandler, { once: true });
    document.addEventListener('touchstart', unlockHandler, { once: true });

    // Start Invitation Splash Button
    if (this.startBtn) {
      this.startBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.startInvitationExperience();
      });
    }

    // Sound Toggle Button
    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hasUserInteracted = true;
        this.isMuted = !this.isMuted;
        this.soundBtn.textContent = this.isMuted ? '🔇' : '🔊';
        soundEngine.toggleMute();

        if (this.activeVideo) {
          this.activeVideo.muted = this.isMuted;
        }
        if (this.idleVideo) {
          this.idleVideo.muted = this.isMuted;
        }
        if (this.birthdayAudio) {
          this.birthdayAudio.muted = this.isMuted;
          if (!this.isMuted && this.shouldPlayMusic && this.birthdayAudio.paused) {
            this.birthdayAudio.play().catch(e => console.warn(e));
          }
        }
      });
    }

    // Capture user click/tap anywhere on the stage
    const stage = document.getElementById('stage-viewport');
    if (stage) {
      stage.addEventListener('pointerdown', (e) => {
        if (e.target.closest('#btn-sound-toggle') || e.target.closest('.card-actions')) return;
        this.handleUserInteraction();
      });
    }

    // Replay Button Click
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) {
      btnReplay.addEventListener('click', (e) => {
        e.stopPropagation();
        this.stopBirthdayMusic();
        this.fsm.reset();
      });
    }
  }

  updateCue(text, icon = "👆") {
    if (this.cueEl && this.cueTextEl) {
      this.cueTextEl.textContent = text;
      if (this.cueIconEl) this.cueIconEl.textContent = icon;
      this.cueEl.classList.remove('hidden');
    }
  }

  hideCue() {
    if (this.cueEl) {
      this.cueEl.classList.add('hidden');
    }
  }
}

// Bootstrap Application
document.addEventListener('DOMContentLoaded', () => {
  const app = new VideoApp();
  app.init();
});
