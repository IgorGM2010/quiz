const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Update onclick
html = html.replace('onclick="showInfo()"', 'onclick="showAboutScreen()"');

// 2. Add the About screen HTML
const aboutScreenHTML = `
        <!-- SCREEN ABOUT -->
        <section id="about-screen" class="screen quiz-wrapper" aria-live="polite">
            <div class="quiz-container">
                <div class="speech-bubble-container" aria-label="Saiba Mais">
                    <div class="speech-bubble-wrapper">
                        <div class="speech-bubble">
                            <div class="speech-bubble-content">
                                <div class="title-line-1" style="font-size: 3rem; margin-bottom: 0;">SAIBA MAIS</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="comic-card">
                    <div style="font-size: 2rem; margin-bottom: 12px;">📚 Disciplina</div>
                    <p style="font-size: 1.5rem; font-weight: normal;">Língua Portuguesa e Literatura Brasileira</p>
                </div>

                <div class="comic-card">
                    <div style="font-size: 2rem; margin-bottom: 12px;">👩‍🏫 Professora</div>
                    <p style="font-size: 1.5rem; font-weight: normal;">Maria da Conceição</p>
                </div>

                <div class="comic-card">
                    <div style="font-size: 2rem; margin-bottom: 16px;">👨‍🎓 Alunos</div>
                    <div class="students-grid" style="display: grid; gap: 12px; width: 100%; font-size: 1.5rem; font-weight: normal;">
                        <div>Caio</div>
                        <div>Felipe</div>
                        <div>Heitor</div>
                        <div>Igor</div>
                        <div>Mateus</div>
                    </div>
                </div>

                <div class="comic-card">
                    <div style="font-size: 2rem; margin-bottom: 12px;">🎯 Objetivo do Quiz</div>
                    <p style="font-size: 1.25rem; font-weight: normal; text-align: justify;">Este quiz foi desenvolvido como uma ferramenta educativa para auxiliar estudantes do Ensino Médio na revisão dos pronomes relativos, um importante conteúdo da gramática da Língua Portuguesa. Por meio de perguntas objetivas e microfeedbacks explicativos, o estudante pode testar seus conhecimentos, compreender seus erros e reforçar a aprendizagem de forma dinâmica, interativa e divertida.</p>
                </div>

                <div class="comic-card">
                    <div style="font-size: 2rem; margin-bottom: 12px;">🧩 Como funciona?</div>
                    <p style="font-size: 1.25rem; font-weight: normal; text-align: justify;">O quiz é composto por 10 questões de múltipla escolha. Cada pergunta apresenta quatro alternativas, sendo apenas uma correta. Após selecionar uma resposta, o estudante recebe um microfeedback explicando o motivo de sua escolha estar correta ou incorreta. Ao final, é exibida a pontuação obtida e uma mensagem de incentivo de acordo com o desempenho alcançado.</p>
                </div>

                <div class="buttons-container">
                    <div class="btn-wrapper">
                        <button class="comic-btn btn-start" onclick="backToHome()" aria-label="Voltar para a tela inicial" tabindex="0">
                            <span class="btn-icon" aria-hidden="true">⬅</span> VOLTAR
                        </button>
                    </div>
                </div>
            </div>
        </section>
`;

html = html.replace('<!-- SCREEN 2: QUIZ -->', aboutScreenHTML + '\n        <!-- SCREEN 2: QUIZ -->');

// 3. Update the JS
const oldJS = `        function showInfo() {
            // Botão "Saiba Mais" - não implementado neste momento
            console.log("Saiba Mais");
        }`;
const newJS = `        function showAboutScreen() {
            switchScreen('screen-initial', 'about-screen');
        }

        function backToHome() {
            switchScreen('about-screen', 'screen-initial');
        }`;

html = html.replace(oldJS, newJS);

// 4. Add the CSS for grid in mobile/desktop
const stylesToAdd = `
        .students-grid {
            grid-template-columns: 1fr;
        }
        @media (min-width: 1024px) {
            .students-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
`;
html = html.replace('</style>', stylesToAdd + '\n    </style>');

fs.writeFileSync('index.html', html);
