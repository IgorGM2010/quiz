const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /const DOM = {[\s\S]*?};/;
const newDom = `const DOM = {
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
        };`;

html = html.replace(regex, newDom);
fs.writeFileSync('index.html', html);
