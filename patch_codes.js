const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /function submitCode\(\) \{[\s\S]*?\} else \{\s*showSystemMessage\("유효하지 않은 코드입니다\.", "#e74c3c"\);\s*\}\s*\}/;

const safeCode = `function submitCode() {
            const codeInput = document.getElementById('codeInputValue').value.trim();
            
            if (!codeInput) return;

            if (redeemedCodes.includes(codeInput)) {
                showSystemMessage("이미 사용한 코드입니다!", "#e74c3c");
                return;
            }

            if (codeInput === "20130903") {
                redeemedCodes.push(codeInput);
                if (!inventory["생일 케이크"]) inventory["생일 케이크"] = 0;
                inventory["생일 케이크"]++;
                updateUI();
                saveGame();
                showSystemMessage("비밀 한정판 [생일 케이크] 획득!", "#1abc9c");
                closeModal('codeModal');
            } else {
                showSystemMessage("유효하지 않은 코드입니다.", "#e74c3c");
            }
        }`;

code = code.replace(regex, safeCode);

fs.writeFileSync('index.html', code);
console.log('Removed testing cheat codes.');
