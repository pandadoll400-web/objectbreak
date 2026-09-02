const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Remove blue system message
const msgRegex = /\} else \{\s*showSystemMessage\(\`\$\{currentItem\.name\} 파괴! \+\$\{reward\.toLocaleString\(\)\}원\`,\s*"#3498db"\);\s*\}/;
code = code.replace(msgRegex, '} else { /* normal break message removed */ }');

// 2. Update dmgDisplay in calcClickDamage or updateUI
// I'll add it to calcClickDamage, and also call it inside loadGame to make sure.
const calcRegex = /clickDamage = maxDmg;/;
code = code.replace(calcRegex, `clickDamage = maxDmg;
            let dmgEl = document.getElementById('dmgDisplay');
            if (dmgEl) dmgEl.innerText = clickDamage.toLocaleString();`);

fs.writeFileSync('index.html', code);
console.log('Patches applied!');
