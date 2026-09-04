/**
 * config.js
 * Centralized configuration for Ana Lucía's Monsters Inc 1st Birthday Web Invitation
 */
export const PARTY_CONFIG = {
  childName: "Ana Lucía",
  age: 1,
  tagline: "¡Nuestra pequeña monstruito cumple su primer año!",
  date: "Sábado 15 de Noviembre de 2026",
  time: "4:00 PM",
  location: {
    name: "Salón Mágico Monstropolis",
    address: "Av. Principal #123, Ciudad",
    googleMapsUrl: "https://maps.google.com/?q=Monstropolis"
  },
  rsvp: {
    whatsappNumber: "521234567890",
    messageTemplate: "¡Hola! Confirmo mi asistencia al cumpleaños de 1 año de Ana Lucía 🎉👶🎂"
  },
  calendar: {
    title: "Cumpleaños 1 Año Ana Lucía - Monsters Inc",
    description: "¡Acompáñanos a festejar el primer añito de Ana Lucía en Monstropolis!",
    startDate: "20261115T160000",
    endDate: "20261115T200000"
  },
  themeColors: {
    sulleyCyan: "#00c4cc",
    sulleyPurple: "#7c3aed",
    mikeGreen: "#a3e635",
    booPink: "#f472b6",
    doorPink: "#ff70a6",
    doorWood: "#fffaf0",
    bgDark: "#090d16"
  },
  videoAssets: {
    introStation: "assets/Monster_hands_resting_on_door_202609041436.mp4",
    idleLoop: "assets/escena_cliclica_espera.mp4",
    touchDoor: "assets/Monster_paws_touching_door_1080p_202609041602.mp4",
    walkToDoor: "assets/Monster_walking_towards_door_1080p_202609041602.mp4",
    openDoor: "assets/Monster_hand_opening_bedroom_door_202609041602.mp4",
    babySleeping: "assets/Baby_sleeping_in_crib_1080p_202609041603.mp4",
    babyParty: "assets/baby_celebrating_birthday.mp4"
  },
  audioAssets: {
    birthdayMusic: "assets/un-alegre-vals-de-ukelele.mp3"
  }
};
