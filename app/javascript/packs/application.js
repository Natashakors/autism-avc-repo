// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.

// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
import { showWeather } from "../plugins/weather";


// Internal imports, e.g:
// import { webspeech } from '../plugins/webspeech';
// import { initSelect2 } from '../components/init_select2';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g: initSelect2();
//weather API
  showWeather();
// WEB SPEECH API

// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const days = document.querySelectorAll("th");
// const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('main');
const items = document.querySelectorAll("img");
const details = document.querySelector(".details");
const sad = document.querySelector("#readsad")
const comfort = "Thank you for telling me how you feel. Just remember you get to"

//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Init voices array.  Hardcoded to US male (unable to implement dropdown on settings page)
let voices = [];
let speakText = "";

// Populate dropdown in Settings Page
const getVoices = () => {
  voices = synth.getVoices();
  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';
    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

//Fix for duplication, run code depending on the browser
if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = getVoices;
    }
}

// For Settings Console
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }
  if (textInput.value !== '') {

    // Get speak text
    speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.lang = "en-UK";
    // speakText.voice = "Daniel";

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking!');
    };

    // Speak error
    speakText.onerror = e => {
      console.error(e);
    };

    // Select voice (unable to implement dropdown on settings page)
    // const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
    //   'data-name'
    // );

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS

const readDetails = () => {
  console.log(details.innerText)
    speakText = new SpeechSynthesisUtterance(details.innerText);
    speakText.rate = 1;
    speakText.pitch = 1;
    speakText.lang = "en-UK";
    synth.speak(speakText);
};

const readText = (text) => {
  console.log('speaking comfort')
  speakText = new SpeechSynthesisUtterance(text);
  speakText.rate = 1;
  speakText.pitch = 1;
  speakText.lang = "en-UK";
  synth.speak(speakText)
}

days.forEach( day => {
  day.addEventListener("click", function( event ) {
    speakText = new SpeechSynthesisUtterance(day.innerHTML);
    speakText.rate = 1;
    speakText.pitch = 1;
    speakText.lang = "en-UK";
    synth.speak(speakText)
  }, false);
});

items.forEach( item => {
  item.addEventListener("click", function( event ) {
    const intro = 'You have to'
    const text = intro + details.innerText
    readText(text);
  }, false);
});


  if (sad) {
    console.log(sad.dataset.happyTitle);
    const text = comfort + sad.dataset.happyDetails;
    readText(text);
  };



// Voice settings form submit
// if (textForm !== null) {
//   textForm.addEventListener('submit', e => {
//   e.preventDefault();
//   speak();
//   textInput.blur();
//   });
// }

// Rate value change
if (rate !== null) {
  rate.addEventListener('change', e => (rateValue.textContent = rate.value));
}

// Pitch value change
if (pitchValue !== null) {
  pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
}

// Voice select change
if (voiceSelect !== null) {
  voiceSelect.addEventListener('change', e => speak());
}
});
