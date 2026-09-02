const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

let regex = /applyWorldTheme\(worldId\);\s*else\s*\{[\s\S]*?document\.getElementById\('btnUpdate'\)\.style\.display\s*=\s*"block";\s*\}/;
code = code.replace(regex, 'applyWorldTheme(worldId);');

fs.writeFileSync('index.html', code);
console.log('Fixed syntax error!');
