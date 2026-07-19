const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newCheckAnswer = `        function checkAnswer(selectedIndex, selectedBtn) {
            const questionData = questions[currentQuestionIndex];
            const isCorrect = (selectedIndex === questionData.correct);
            const feedbackData = questionData.feedback[selectedIndex];

            if (isCorrect) score++;

            // Desabilitar todas as opções
            const buttons = document.querySelectorAll('.alternative-btn');
            buttons.forEach((btn, index) => {
                btn.classList.add('answer-disabled');
                
                if (index === selectedIndex) {
                    // Animacao de clique
                    btn.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        btn.style.transform = 'scale(1)';
                    }, 200);

                    if (isCorrect) {
                        btn.classList.add('answer-correct');
                        btn.innerHTML += '<span style="position: absolute; right: 16px; font-weight: bold; font-family: sans-serif;">✔</span>';
                    } else {
                        btn.classList.add('answer-wrong');
                        btn.innerHTML += '<span style="position: absolute; right: 16px; font-weight: bold; font-family: sans-serif;">✖</span>';
                    }
                }
            });

            // Somente após mudança e animacao, exibe feedback
            setTimeout(() => {
                showFeedback(feedbackData);
            }, 250);
        }`;

html = html.replace(/function checkAnswer[\s\S]*?showFeedback\(feedbackData\);\n        }/, newCheckAnswer);

// Append new styles
const newStyles = `
        .answer-correct {
            background-color: #4CAF50 !important;
            color: #FFFFFF !important;
            border: 4px solid #000 !important;
            transition: background-color .25s ease, transform .2s ease, box-shadow .25s ease !important;
        }

        .answer-wrong {
            background-color: #E53935 !important;
            color: #FFFFFF !important;
            border: 4px solid #000 !important;
            transition: background-color .25s ease, transform .2s ease, box-shadow .25s ease !important;
        }

        .answer-disabled {
            pointer-events: none;
        }
        
        .alternative-btn {
            position: relative;
        }
`;

html = html.replace('</style>', newStyles + '\n    </style>');

fs.writeFileSync('index.html', html);
