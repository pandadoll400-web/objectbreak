const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. breakItem
let breakRegex = /let reward = currentItem\.tier\.breakReward \|\| 0;/;
let safeBreak = `let reward = currentItem.tier.breakReward || 0;
                if (currentItem.name.includes("[천악]")) reward = Math.floor(reward * 1.1);`;
code = code.replace(breakRegex, safeBreak);

// 2. setInterval (passive income)
let passiveRegex = /let count = equippedInventory\[name\];\n\s*let tier = findTierByItem\(name\);\n\s*fps \+= count \* tier\.incomeBase;/;
let safePassive = `let count = equippedInventory[name];
                let tier = findTierByItem(name);
                let income = tier.incomeBase;
                if (name.includes("[천악]")) income = Math.floor(income * 1.1);
                fps += count * income;`;
code = code.replace(passiveRegex, safePassive);

// 3. openInventory (UI display)
let invRegex = /let tier = findTierByItem\(name\);\n\s*let equipped = equippedInventory\[name\] \|\| 0;\n\s*let unequipped = inventory\[name\] - equipped;\n\s*let income = tier\.incomeBase;/;
let safeInv = `let tier = findTierByItem(name);
                    let equipped = equippedInventory[name] || 0;
                    let unequipped = inventory[name] - equipped;
                    let income = tier.incomeBase;
                    if (name.includes("[천악]")) income = Math.floor(income * 1.1);`;
code = code.replace(invRegex, safeInv);

fs.writeFileSync('index.html', code);
console.log('천악 10% bonus patch applied');
