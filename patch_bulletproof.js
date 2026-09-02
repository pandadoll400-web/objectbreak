const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Replace spawnItem
const spawnRegex = /function spawnItem\(\) \{[\s\S]*?isSpawning = false;\n        \}/;
const safeSpawn = `function spawnItem() {
            try {
                isSpawning = true;
                let rand = Math.random();
                let selectedTier;
                
                if (currentWorld === 3) {
                    let allowedTiers = tiers.slice(4);
                    let equalChance = Math.random();
                    if (equalChance < 0.3) {
                        selectedTier = tiers.find(t => t.name === "비밀") || allowedTiers[0];
                    } else if (equalChance < 0.5) {
                        selectedTier = tiers.find(t => t.name === "유니크") || allowedTiers[1];
                    } else if (equalChance < 0.7) {
                        selectedTier = tiers.find(t => t.name === "코스믹") || allowedTiers[2];
                    } else if (equalChance < 0.85) {
                        selectedTier = tiers.find(t => t.name === "디바인") || allowedTiers[3];
                    } else if (equalChance < 0.95) {
                        selectedTier = tiers.find(t => t.name === "금지된") || allowedTiers[4];
                    } else {
                        selectedTier = tiers.find(t => t.name === "천상의") || allowedTiers[5];
                    }
                } else if (currentWorld === 2) {
                    if (rand < 0.1) selectedTier = tiers.find(t => t.name === "디바인") || tiers[tiers.length - 1];
                    else if (rand < 0.3) selectedTier = tiers.find(t => t.name === "코스믹") || tiers[tiers.length - 2];
                    else if (rand < 0.6) selectedTier = tiers.find(t => t.name === "비밀") || tiers[tiers.length - 4];
                    else if (rand < 0.9) selectedTier = tiers.find(t => t.name === "유니크") || tiers[tiers.length - 3];
                    else selectedTier = tiers.find(t => t.name === "전설") || tiers[0];
                } else {
                    let cumulative = 0;
                    let totalProb = tiers.reduce((sum, t) => sum + t.prob, 0);
                    for (let tier of tiers) {
                        cumulative += (tier.prob / totalProb);
                        if (rand <= cumulative) {
                            selectedTier = tier;
                            break;
                        }
                    }
                    if (!selectedTier) selectedTier = tiers[0];
                }
                
                let selectedItem = selectedTier.items[Math.floor(Math.random() * selectedTier.items.length)];
                
                if (currentWorld === 3) {
                    selectedItem = "[천악] " + selectedItem;
                }

                let baseName = selectedItem.replace('[천악] ', '');
                maxHp = selectedTier.hpBase || 100;
                currentHp = maxHp;
                
                currentItem = {
                    name: selectedItem,
                    tier: selectedTier,
                    maxHp: maxHp,
                    baseName: baseName
                };
                
                timeLeft = currentMaxTime || 20;
                
                const display = document.getElementById('itemDisplay');
                if (display) {
                    display.innerText = itemIcons[baseName] || "📦";
                    display.style.boxShadow = \`inset 0 0 25px \${selectedTier.color}40, 0 0 15px \${selectedTier.color}60\`;
                    display.style.border = \`2px solid \${selectedTier.color}\`;
                    display.style.transform = "none";
                    display.style.opacity = "1";
                    display.classList.remove('item-burning');
                }
                
                let nameEl = document.getElementById('itemName');
                if (nameEl) nameEl.innerText = selectedItem;
                
                let tierEl = document.getElementById('itemTier');
                if (tierEl) {
                    tierEl.innerText = \`[\${selectedTier.name}]\`;
                    tierEl.style.color = selectedTier.color;
                }
                
                if (typeof isItemBurning !== 'undefined') isItemBurning = false;
                
                if (typeof updateHpBar === 'function') updateHpBar();
                if (typeof updateTimerBar === 'function') updateTimerBar();
                
                isSpawning = false;
            } catch(e) {
                if(typeof showSystemMessage === 'function') showSystemMessage("스폰 오류: " + e.message, "#e74c3c");
                console.error("spawnItem Error:", e);
                isSpawning = false; // Prevent permanent freeze
            }
        }`;
code = code.replace(spawnRegex, safeSpawn);

// Replace breakItem
const breakRegex = /function breakItem\([\s\S]*?\} 400\);\n        \}/;
const safeBreak = `function breakItem(isSilent = false) {
            try {
                isSpawning = true;
                
                if (!currentItem || !currentItem.tier) {
                    isSpawning = false;
                    spawnItem();
                    return;
                }
                
                let reward = currentItem.tier.breakReward || 0;
                
                if (typeof isPhoenixActive !== 'undefined' && isPhoenixActive) reward *= 3;
                if (typeof isItemBurning !== 'undefined' && isItemBurning) {
                    reward = Math.floor(reward * 1.3);
                }
                
                if (typeof money !== 'undefined') money += reward;
                
                if (!isSilent) {
                    if (typeof isItemBurning !== 'undefined' && isItemBurning) {
                        showSystemMessage(\`🔥 불타는 \${currentItem.name} 파괴! +\${reward.toLocaleString()}원 (30% 보너스)\`, "#e67e22");
                    } else if (typeof isLuckEvent !== 'undefined' && isLuckEvent && Math.random() < 0.2) {
                        let bonus = reward * 2;
                        money += bonus;
                        showSystemMessage(\`🍀 럭키 보너스! +\${bonus.toLocaleString()}원 추가 획득!\`, "#f1c40f");
                    } else {
                        showSystemMessage(\`\${currentItem.name} 파괴! +\${reward.toLocaleString()}원\`, "#3498db");
                    }

                    if (typeof spawnDropElement === 'function') spawnDropElement(currentItem);

                    const display = document.getElementById('itemDisplay');
                    if (display) {
                        display.style.transform = "scale(0.3) rotate(180deg)";
                        display.style.opacity = "0";
                    }
                    
                    const hpBar = document.getElementById('hpBar');
                    if (hpBar) hpBar.style.width = "0%";
                    
                    const hpText = document.getElementById('hpText');
                    if (hpText && maxHp) hpText.innerText = \`0 / \${maxHp.toLocaleString()}\`;
                }
                
                setTimeout(() => {
                    if (typeof updateUI === 'function') updateUI();
                    spawnItem();
                }, 400);
            } catch(e) {
                if(typeof showSystemMessage === 'function') showSystemMessage("파괴 오류: " + e.message, "#e74c3c");
                console.error("breakItem Error:", e);
                isSpawning = false;
                setTimeout(() => spawnItem(), 400);
            }
        }`;
if (code.includes('function breakItem')) {
    code = code.replace(/function breakItem\([\s\S]*?spawnItem\(\);\n            \}, 400\);\n        \}/, safeBreak);
}

// Replace the cheat code slightly to make sure it doesn't freeze
const cheatCodeRegex = /if \(codeInput === "sorry" \|\| codeInput === "restore_all"\) \{[\s\S]*?setTimeout\(\(\) => \{ spawnItem\(\); \}, 100\);\n            \} else \{/;
const safeCheat = `if (codeInput === "sorry" || codeInput === "restore_all") {
                try {
                    redeemedCodes.push(codeInput);
                    money += 500000000000;
                    if (!inventory["수박"]) inventory["수박"] = 0;
                    inventory["수박"] += 3;
                    if (!weaponInventory[7]) weaponInventory[7] = {4: 1};
                    else weaponInventory[7][4] = 1;
                    
                    if (inventory["아령"]) { inventory["덤벨"] = (inventory["덤벨"]||0) + inventory["아령"]; delete inventory["아령"]; }
                    if (inventory["차"]) { inventory["문"] = (inventory["문"]||0) + inventory["차"]; delete inventory["차"]; }
                    if (inventory["집"]) { inventory["창"] = (inventory["창"]||0) + inventory["집"]; delete inventory["집"]; }
                    if (inventory["안드로이드"]) { inventory["핸드폰"] = (inventory["핸드폰"]||0) + inventory["안드로이드"]; delete inventory["안드로이드"]; }
                    if (inventory["별"]) { inventory["왕관"] = (inventory["왕관"]||0) + inventory["별"]; delete inventory["별"]; }
                    
                    equippedInventory = {}; 
                    isSpawning = false;
                    
                    calcClickDamage();
                    updateUI();
                    saveGame();
                    showSystemMessage("복구 완료! 버그가 해결되었습니다.", "#1abc9c");
                    closeModal('codeModal');
                    
                    breakItem(true);
                } catch(e) {
                    showSystemMessage("코드 실행 오류: " + e.message, "#e74c3c");
                }
            } else {`;
code = code.replace(cheatCodeRegex, safeCheat);

fs.writeFileSync('index.html', code);
console.log("Bulletproof patches applied");
