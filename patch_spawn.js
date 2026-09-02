const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

if(!code.includes('function spawnItem() {')) {
    const fn = `
        function spawnItem() {
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
            maxHp = selectedTier.hpBase;
            currentHp = maxHp;
            
            currentItem = {
                name: selectedItem,
                tier: selectedTier,
                maxHp: maxHp,
                baseName: baseName
            };
            
            timeLeft = currentMaxTime;
            
            const display = document.getElementById('itemDisplay');
            display.innerText = itemIcons[baseName] || "📦";
            
            document.getElementById('itemName').innerText = selectedItem;
            document.getElementById('itemTier').innerText = \`[\${selectedTier.name}]\`;
            document.getElementById('itemTier').style.color = selectedTier.color;
            
            display.style.boxShadow = \`inset 0 0 25px \${selectedTier.color}40, 0 0 15px \${selectedTier.color}60\`;
            display.style.border = \`2px solid \${selectedTier.color}\`;
            display.style.transform = "none";
            display.style.opacity = "1";
            display.classList.remove('item-burning');
            
            updateHpBar();
            updateTimerBar();
            
            isSpawning = false;
        }
    `;
    code = code.replace('</script>', fn + '\n</script>');
    fs.writeFileSync('index.html', code);
    console.log('Restored spawnItem');
} else {
    console.log('spawnItem exists');
}
