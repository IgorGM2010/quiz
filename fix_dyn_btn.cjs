const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace("btn.className = 'comic-btn alternative-btn';", "btn.className = 'comic-btn alternative-btn';\\n                btn.type = 'button';");

fs.writeFileSync('index.html', html);
