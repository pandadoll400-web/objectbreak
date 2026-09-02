const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const validateLogic = `
        // Validate inventory on load to fix corruption
        for (let name in inventory) {
            inventory[name] = parseInt(inventory[name]) || 0;
            if (inventory[name] < 0) inventory[name] = 0;
        }
        for (let name in equippedInventory) {
            equippedInventory[name] = parseInt(equippedInventory[name]) || 0;
            if (equippedInventory[name] < 0) equippedInventory[name] = 0;
            if (equippedInventory[name] > (inventory[name] || 0)) {
                equippedInventory[name] = inventory[name] || 0;
            }
        }
`;

const loadGameRegex = /if \(typeof state\.isLuckEvent === 'boolean'\) isLuckEvent = state\.isLuckEvent;/;
if (!code.includes('Validate inventory on load')) {
    code = code.replace(loadGameRegex, "if (typeof state.isLuckEvent === 'boolean') isLuckEvent = state.isLuckEvent;\n" + validateLogic);
}

fs.writeFileSync('index.html', code);
console.log('Added validation logic');
