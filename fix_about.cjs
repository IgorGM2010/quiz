const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the old screen-about HTML with a version containing staggered animations
const oldHTML = `<section id="about-screen" class="screen quiz-wrapper" aria-live="polite">`;
const newHTML = `<section id="about-screen" class="screen quiz-wrapper" aria-live="polite">`;
// Wait, I can just replace the comic-cards and bubble container inside about-screen to have a new class "about-animate".
