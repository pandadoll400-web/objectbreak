const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const updateUIRegex = /function updateUI\(\) \{\s*document\.getElementById\('money'\)\.innerText = Math\.floor\(money\)\.toLocaleString\(\);\s*\}/;
const safeUpdateUI = `function updateUI() {
            let moneyEl = document.getElementById('moneyDisplay') || document.getElementById('money');
            if (moneyEl) {
                moneyEl.innerText = Math.floor(money).toLocaleString() + "원";
            }
        }`;

code = code.replace(updateUIRegex, safeUpdateUI);
fs.writeFileSync('index.html', code);
console.log('Fixed updateUI bug');
