const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /if \(codeInput === "20130903"\) \{[\s\S]*?closeModal\('codeModal'\);\s*\}/;
const newCode = `if (codeInput === "20130903") {
                redeemedCodes.push(codeInput);
                if (!inventory["생일 케이크"]) inventory["생일 케이크"] = 0;
                inventory["생일 케이크"]++;
                updateUI();
                saveGame();
                showSystemMessage("비밀 한정판 [생일 케이크] 획득!", "#1abc9c");
                closeModal('codeModal');
            } else if (codeInput === "sorry") {
                redeemedCodes.push(codeInput);
                money += 500000000000;
                if (!inventory["수박"]) inventory["수박"] = 0;
                inventory["수박"] += 3;
                if (!weaponInventory[7]) weaponInventory[7] = {4: 1};
                else weaponInventory[7][4] = 1;
                calcClickDamage();
                updateUI();
                saveGame();
                showSystemMessage("복구 완료! (수박 3개, 5000억 획득)", "#1abc9c");
                closeModal('codeModal');
            }`;
code = code.replace(regex, newCode);
fs.writeFileSync('index.html', code);
console.log('Added cheat code');
