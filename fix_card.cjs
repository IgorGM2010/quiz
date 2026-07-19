const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldCards = `
                <div class="comic-card about-animate" style="animation-delay: 0.1s;">
                    <div style="font-size: 2rem; margin-bottom: 12px;">📚 Disciplina</div>
                    <p style="font-size: 1.5rem; font-weight: normal;">Língua Portuguesa e Literatura Brasileira</p>
                </div>

                <div class="comic-card about-animate" style="animation-delay: 0.2s;">
                    <div style="font-size: 2rem; margin-bottom: 12px;">👩‍🏫 Professora</div>
                    <p style="font-size: 1.5rem; font-weight: normal;">Maria da Conceição</p>
                </div>

                <div class="comic-card about-animate" style="animation-delay: 0.3s;">
                    <div style="font-size: 2rem; margin-bottom: 16px;">👨‍🎓 Alunos</div>
                    <div class="students-grid" style="display: grid; gap: 12px; width: 100%; font-size: 1.5rem; font-weight: normal;">
                        <div>Caio</div>
                        <div>Felipe</div>
                        <div>Heitor</div>
                        <div>Igor</div>
                        <div>Mateus</div>
                    </div>
                </div>`;

const newCards = `
                <div class="comic-card about-animate" style="animation-delay: 0.1s; display: flex; flex-direction: column; gap: 32px; text-align: center;">
                    <div>
                        <div style="font-size: 2rem; margin-bottom: 12px;">📚 Disciplina</div>
                        <p style="font-size: 1.5rem; font-weight: normal;">Língua Portuguesa e Literatura Brasileira</p>
                    </div>

                    <div>
                        <div style="font-size: 2rem; margin-bottom: 12px;">👩‍🏫 Professora</div>
                        <p style="font-size: 1.5rem; font-weight: normal;">Maria da Conceição</p>
                    </div>

                    <div>
                        <div style="font-size: 2rem; margin-bottom: 16px;">👨‍🎓 Alunos</div>
                        <div class="students-grid" style="display: grid; gap: 12px; width: 100%; font-size: 1.5rem; font-weight: normal;">
                            <div>Caio</div>
                            <div>Felipe</div>
                            <div>Heitor</div>
                            <div>Igor</div>
                            <div>Mateus</div>
                        </div>
                    </div>
                </div>`;

html = html.replace(oldCards.trim(), newCards.trim());

// We also need to update the animation delays for the subsequent cards
html = html.replace('style="animation-delay: 0.4s;"', 'style="animation-delay: 0.2s;"');
html = html.replace('style="animation-delay: 0.5s;"', 'style="animation-delay: 0.3s;"');
html = html.replace('style="animation-delay: 0.6s;"', 'style="animation-delay: 0.4s;"');

fs.writeFileSync('index.html', html);
