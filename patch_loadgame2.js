const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /function loadGame\(\) \{[\s\S]*?return false;\s*\}\s*\}/m;

const correctLoadGame = `function loadGame() {
            try {
                const savedStr = localStorage.getItem('breakGameState');
                if (!savedStr) return false;
                
                const state = JSON.parse(savedStr);
                
                if (typeof state.money === 'number') money = state.money;
                if (state.currentWorld) currentWorld = state.currentWorld;
                if (state.inventory) inventory = state.inventory;
                if (state.equippedInventory) equippedInventory = state.equippedInventory;
                if (state.weaponInventory) {
                    weaponInventory = state.weaponInventory;
                } else if (state.ownedWeapons) { 
                    weaponInventory = { 1: {0: 1} };
                    state.ownedWeapons.forEach(id => {
                        if (id !== 1) weaponInventory[id] = {0: 1};
                    });
                }
                
                if (state.redeemedCodes) redeemedCodes = state.redeemedCodes;
                if (state.luckEndTime) luckEndTime = state.luckEndTime;
                if (state.luckMultiplier) luckMultiplier = state.luckMultiplier;
                if (typeof state.isLuckEvent === 'boolean') isLuckEvent = state.isLuckEvent;

                calcClickDamage();
                
                document.getElementById('dropZone').innerHTML = '';
                pendingDrops = [];
                if (state.pendingDrops && Array.isArray(state.pendingDrops)) {
                    state.pendingDrops.forEach(drop => {
                        let tier = findTierByItem(drop.name);
                        spawnDropElement({name: drop.name, tier: tier}, true); 
                    });
                }

                if (state.currentItem && state.currentHp > 0) {
                    currentItem = state.currentItem;
                    currentHp = state.currentHp;
                    maxHp = state.maxHp;
                    timeLeft = state.timeLeft || currentMaxTime;
                    
                    document.getElementById('itemName').innerText = currentItem.name;
                    document.getElementById('itemTier').innerText = \`[\${currentItem.tier.name}]\`;
                    document.getElementById('itemTier').style.color = currentItem.tier.color;
                    
                    const display = document.getElementById('itemDisplay');
                    let baseName = currentItem.name.replace('[천악] ', '');
                    display.innerText = itemIcons[baseName] || "📦";
                    display.style.boxShadow = \`inset 0 0 25px \${currentItem.tier.color}40, 0 0 15px \${currentItem.tier.color}60\`;
                    display.style.border = \`2px solid \${currentItem.tier.color}\`;
                    
                    updateHpBar();
                    updateTimerBar();
                    return true; 
                }
            } catch (e) {
                console.error("Load error:", e);
            }
            return false;
        }`;

code = code.replace(regex, correctLoadGame);
fs.writeFileSync('index.html', code);
console.log('Fixed loadGame');
