const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update the meta tags
const newHead = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Quiz educativo sobre Pronomes Relativos para estudantes do Ensino Médio.">
    <meta name="author" content="Caio, Felipe, Heitor, Igor e Mateus">
    <meta name="theme-color" content="#EF5350">
    <title>Quiz dos Pronomes Relativos</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bangers&display=swap" rel="stylesheet">
    <style>`;
html = html.replace(/<!DOCTYPE html>[\s\S]*?<style>/, newHead);

// 2. Fix the missing closing tag in SCREEN 3
html = html.replace(
    /<\/div>\s*<\/div>\s*<\/div>\s*<div class="buttons-container">/,
    '</div></div></div></div><div class="buttons-container">'
);

// 3. Add defer to the script if possible (the script is inline at the end of the body, so it's already deferred inherently, but we can structure it well).

// 4. Update the JavaScript for DOM caching and let/const
const jsRegex = /<script>([\s\S]*?)<\/script>/;
const match = jsRegex.exec(html);

if (match) {
    let jsCode = match[1];

    // Let's replace document.getElementById with cached variables where applicable
    // Since variables are in global scope inside the script, we can do it at the start or in an init function.
    // Actually, replacing all getElementById inside functions with consts at the top level is fine since the script is at the bottom of the body.
    
    // We will inject the DOM cache just before the first function definition (showAboutScreen).
    const domCache = `
        const DOM = {
            screenInitial: document.getElementById('screen-initial'),
            screenAbout: document.getElementById('about-screen'),
            screenQuiz: document.getElementById('screen-quiz'),
            screenFinal: document.getElementById('screen-final'),
            questionCounter: document.getElementById('question-counter'),
            progressBar: document.getElementById('progress-bar'),
            questionText: document.getElementById('question-text'),
            alternativesContainer: document.getElementById('alternatives-container'),
            feedbackContainer: document.getElementById('feedback-container'),
            nextBtnContainer: document.getElementById('next-btn-container'),
            feedbackIcon: document.getElementById('feedback-icon'),
            feedbackTitle: document.getElementById('feedback-title'),
            feedbackText: document.getElementById('feedback-text'),
            finalScoreText: document.getElementById('final-score-text'),
            finalPercentage: document.getElementById('final-percentage'),
            finalMessage: document.getElementById('final-message')
        };
`;
    
    jsCode = jsCode.replace('        function showAboutScreen() {', domCache + '\n        function showAboutScreen() {');
    
    // Now replace occurrences of document.getElementById
    jsCode = jsCode.replace(/document\.getElementById\('screen-initial'\)/g, "DOM.screenInitial");
    jsCode = jsCode.replace(/document\.getElementById\('about-screen'\)/g, "DOM.screenAbout");
    jsCode = jsCode.replace(/document\.getElementById\('screen-quiz'\)/g, "DOM.screenQuiz");
    jsCode = jsCode.replace(/document\.getElementById\('screen-final'\)/g, "DOM.screenFinal");
    jsCode = jsCode.replace(/document\.getElementById\('question-counter'\)/g, "DOM.questionCounter");
    jsCode = jsCode.replace(/document\.getElementById\('progress-bar'\)/g, "DOM.progressBar");
    jsCode = jsCode.replace(/document\.getElementById\('question-text'\)/g, "DOM.questionText");
    jsCode = jsCode.replace(/document\.getElementById\('alternatives-container'\)/g, "DOM.alternativesContainer");
    jsCode = jsCode.replace(/document\.getElementById\('feedback-container'\)/g, "DOM.feedbackContainer");
    jsCode = jsCode.replace(/document\.getElementById\('next-btn-container'\)/g, "DOM.nextBtnContainer");
    jsCode = jsCode.replace(/document\.getElementById\('feedback-icon'\)/g, "DOM.feedbackIcon");
    jsCode = jsCode.replace(/document\.getElementById\('feedback-title'\)/g, "DOM.feedbackTitle");
    jsCode = jsCode.replace(/document\.getElementById\('feedback-text'\)/g, "DOM.feedbackText");
    jsCode = jsCode.replace(/document\.getElementById\('final-score-text'\)/g, "DOM.finalScoreText");
    jsCode = jsCode.replace(/document\.getElementById\('final-percentage'\)/g, "DOM.finalPercentage");
    jsCode = jsCode.replace(/document\.getElementById\('final-message'\)/g, "DOM.finalMessage");

    // Also replace innerText with textContent for security/performance, except innerHTML where it's used for replace(/\n/g, '<br>')
    jsCode = jsCode.replace(/\.innerText =/g, ".textContent =");
    
    // Update switchScreen to accept elements instead of IDs, but since we already passed IDs, let's just change the calls or update the function
    const newSwitchScreen = `
        function switchScreen(hideEl, showEl, callback) {
            hideEl.classList.remove('active');
            setTimeout(() => {
                if (callback) callback();
                showEl.classList.add('active');
            }, 300);
        }`;
    
    jsCode = jsCode.replace(/function switchScreen[\s\S]*?}/, newSwitchScreen.trim());
    
    jsCode = jsCode.replace(/switchScreen\('screen-initial', 'about-screen'\)/g, "switchScreen(DOM.screenInitial, DOM.screenAbout)");
    jsCode = jsCode.replace(/switchScreen\('about-screen', 'screen-initial'\)/g, "switchScreen(DOM.screenAbout, DOM.screenInitial)");
    jsCode = jsCode.replace(/switchScreen\('screen-initial', 'screen-quiz'/g, "switchScreen(DOM.screenInitial, DOM.screenQuiz");
    jsCode = jsCode.replace(/switchScreen\('screen-quiz', 'screen-final'\)/g, "switchScreen(DOM.screenQuiz, DOM.screenFinal)");
    jsCode = jsCode.replace(/switchScreen\('screen-final', 'screen-initial'\)/g, "switchScreen(DOM.screenFinal, DOM.screenInitial)");

    html = html.replace(match[1], jsCode);
}

fs.writeFileSync('index.html', html);
