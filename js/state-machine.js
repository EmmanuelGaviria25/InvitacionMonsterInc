/**
 * state-machine.js
 * Deterministic Finite State Machine (FSM) for Video-Driven Scene Progression
 */
export const STATES = {
  INTRO_STATION: 'STATE_INTRO_STATION',      // Clip: Llegada / reposo inicial de la puerta
  IDLE_WAIT: 'STATE_IDLE_WAIT',              // Clip: Espera cíclica continua (escena_cliclica_espera.mp4)
  TOUCH_DOOR: 'STATE_TOUCH_DOOR',            // Clip: Sulley toca la puerta
  WALK_TO_DOOR: 'STATE_WALK_TO_DOOR',        // Clip: Caminando hacia la puerta
  OPEN_DOOR: 'STATE_OPEN_DOOR',              // Clip: Abriendo la puerta de la habitación
  ROOM_SLEEPING: 'STATE_ROOM_SLEEPING',      // Clip: Ana Lucía durmiendo plácidamente
  PARTY_CELEBRATION: 'STATE_PARTY_CELEBRATION', // Clip: Despertar, risas y celebración de cumpleaños
  INVITATION_CARD: 'STATE_INVITATION_CARD'   // Tarjeta final Glassmorphism con RSVP
};

export class StateMachine {
  constructor(initialState = STATES.INTRO_STATION) {
    this.currentState = initialState;
    this.listeners = [];
  }

  getState() {
    return this.currentState;
  }

  onStateChange(callback) {
    this.listeners.push(callback);
  }

  transitionTo(newState, payload = {}) {
    console.log(`[FSM] State transition: ${this.currentState} -> ${newState}`);
    const prevState = this.currentState;
    this.currentState = newState;

    this.listeners.forEach(cb => {
      try {
        cb(this.currentState, prevState, payload);
      } catch (err) {
        console.error('[FSM] Error in state change listener:', err);
      }
    });
  }

  reset() {
    this.transitionTo(STATES.INTRO_STATION);
  }
}
