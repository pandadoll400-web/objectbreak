const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Add error logger function
const errorLogger = `
        window.onerror = function(msg, url, lineNo, columnNo, error) {
            let errStr = "Error: " + msg + " at line " + lineNo;
            showSystemMessage("🚨 시스템 오류 발생! " + errStr, "#e74c3c");
            console.error(errStr, error);
            return false;
        };
`;
if (!code.includes('window.onerror')) {
    code = code.replace(/<script>/, '<script>\n' + errorLogger);
}

// 2. Wrap breakItem in try catch
const breakItemRegex = /function breakItem\(\) \{([\s\S]*?)\n        \}\n\n        function getEquippedCount/m;
const breakItemMatch = code.match(breakItemRegex);
if (breakItemMatch) {
    let body = breakItemMatch[1];
    // If not already wrapped
    if (!body.includes('try {')) {
        let newBreakItem = `function breakItem() {
            try {
${body}
            } catch(e) {
                showSystemMessage("🚨 breakItem 오류: " + e.message, "#e74c3c");
                console.error(e);
                isSpawning = false;
                spawnItem();
            }
        }

        function getEquippedCount`;
        code = code.replace(breakItemRegex, newBreakItem);
    }
}

// 3. Wrap spawnItem in try catch
const spawnItemRegex = /function spawnItem\(\) \{([\s\S]*?)\n        \}\n\n        function updateHpBar/m;
const spawnItemMatch = code.match(spawnItemRegex);
if (spawnItemMatch) {
    let body = spawnItemMatch[1];
    if (!body.includes('try {')) {
        let newSpawnItem = `function spawnItem() {
            try {
${body}
            } catch(e) {
                showSystemMessage("🚨 spawnItem 오류: " + e.message, "#e74c3c");
                console.error(e);
                isSpawning = false;
            }
        }

        function updateHpBar`;
        code = code.replace(spawnItemRegex, newSpawnItem);
    }
}

// 4. Ensure we convert inventory values to numbers properly in getEquippedCount and UI
const getEquippedCountRegex = /function getEquippedCount\(\) \{[\s\S]*?return count;\s*\}/;
const getEquippedCountNew = `function getEquippedCount() {
            let count = 0;
            for (let name in equippedInventory) {
                count += parseInt(equippedInventory[name]) || 0;
            }
            return count;
        }`;
code = code.replace(getEquippedCountRegex, getEquippedCountNew);

fs.writeFileSync('index.html', code);
console.log('Added error logging and try-catches');
