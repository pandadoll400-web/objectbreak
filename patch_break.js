const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /showSystemMessage\(`\$\{currentItem\.name\} 파괴! \+\$\{reward\.toLocaleString\(\)\}원, "#3498db"\);/g;
if(code.match(regex)) {
    code = code.replace(regex, 'showSystemMessage(`${currentItem.name} 파괴! +${reward.toLocaleString()}원`, "#3498db");');
}

// Another possible variation if characters got garbled
const regex2 = /showSystemMessage\(`\$\{currentItem\.name\} [^`]+, "#3498db"\);/g;
code = code.replace(regex2, 'showSystemMessage(`${currentItem.name} 파괴! +${reward.toLocaleString()}원`, "#3498db");');

fs.writeFileSync('index.html', code);
console.log('Fixed breakItem');
