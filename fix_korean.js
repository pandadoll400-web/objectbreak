const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const correctTiers = `        const tiers = [
            { name: "일반", prob: 500, hpBase: 20, breakReward: 10, buyCost: 50, incomeBase: 1, color: "#a29bfe", items: ["지우개", "연필", "신용카드", "안경"] },
            { name: "초희귀", prob: 300, hpBase: 150, breakReward: 50, buyCost: 250, incomeBase: 5, color: "#74b9ff", items: ["공책", "백과사전", "책상", "아령"] },
            { name: "전설", prob: 140, hpBase: 2000, breakReward: 500, buyCost: 2500, incomeBase: 25, color: "#55efc4", items: ["베개", "변기", "차", "선풍기"] },
            { name: "신화", prob: 45, hpBase: 30000, breakReward: 10000, buyCost: 50000, incomeBase: 150, color: "#fdcb6e", items: ["범고래", "집", "시계"] },
            { name: "비밀", prob: 13, hpBase: 1000000, breakReward: 500000, buyCost: 2500000, incomeBase: 1000, color: "#ff7675", items: ["컴퓨터", "안드로이드", "건물", "생일 케이크"] },
            { name: "유니크", prob: 2, hpBase: 50000000, breakReward: 20000000, buyCost: 100000000, incomeBase: 10000, color: "#d63031", items: ["별"] },
            { name: "코스믹", prob: 0.5, hpBase: 500000000, breakReward: 200000000, buyCost: 1000000000, incomeBase: 100000, color: "#9b59b6", items: ["블랙홀", "우주선"] },
            { name: "디바인", prob: 0, hpBase: 5000000000, breakReward: 2000000000, buyCost: 10000000000, incomeBase: 1000000, color: "#ff9f43", items: ["수박"] },
            { name: "금지된", prob: 0, hpBase: 50000000000, breakReward: 20000000000, buyCost: 100000000000, incomeBase: 10000000, color: "#34495e", items: ["다이아몬드", "큐브", "금고"] },
            { name: "천상의", prob: 0, hpBase: 500000000000, breakReward: 200000000000, buyCost: 1000000000000, incomeBase: 100000000, color: "#f5f6fa", items: ["왁뿌볼"] }
        ];`;

const correctWeapons = `        const weapons = [
            { id: 1, name: "맨손", cost: 0, damage: 1, icon: "✋" },
            { id: 2, name: "나무 막대기", cost: 100, damage: 5, icon: "🪵" },
            { id: 3, name: "쇠파이프", cost: 1000, damage: 25, icon: "🪈" },
            { id: 4, name: "야구 빠따", cost: 5000, damage: 100, icon: "🏏" },
            { id: 5, name: "전기톱", cost: 30000, damage: 500, icon: "🪚" },
            { id: 6, name: "라이트 검", cost: 200000, damage: 3000, icon: "🗡️" },
            { id: 7, name: "플라즈마 캐논", cost: 1500000, damage: 20000, icon: "🚀" },
            { id: 9, name: "파멸의 낫", cost: 250000000, damage: 700000, icon: "🪓" },
            { id: 10, name: "우주 파괴자", cost: 2500000000, damage: 7000000, icon: "💥" },
            { id: 11, name: "신살검", cost: 25000000000, damage: 70000000, icon: "🗡️" },
            { id: 12, name: "캐로베로스의 명검", cost: 250000000000, damage: 7000000000, icon: "⚔️" }
        ];`;

const correctIcons = `        const itemIcons = {
            "지우개": "🧽", "연필": "✏️", "신용카드": "💳", "안경": "👓",
            "공책": "📓", "백과사전": "📚", "책상": "🪑", "아령": "🏋️",
            "베개": "🛌", "변기": "🚽", "차": "🚗", "선풍기": "🌀",
            "범고래": "🐳", "집": "🏠", "시계": "⌚",
            "컴퓨터": "💻", "안드로이드": "🤖", "건물": "🏢", "생일 케이크": "🎂",
            "별": "⭐",
            "블랙홀": "🌌", "우주선": "🛸",
            "수박": "🍉",
            "다이아몬드": "💎", "큐브": "🧊", "금고": "🗄️",
            "왁뿌볼": "🔮"
        };`;

// Replace tiers
code = code.replace(/const tiers = \[[\s\S]*?\];/m, correctTiers);
// Replace weapons
code = code.replace(/const weapons = \[[\s\S]*?\];/m, correctWeapons);
// Replace icons
code = code.replace(/const itemIcons = \{[\s\S]*?\};/m, correctIcons);

const correctSpawnItem = `        function spawnItem() {
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
        }`;

code = code.replace(/function spawnItem\(\) \{[\s\S]*?isSpawning = false;\s*\}/m, correctSpawnItem);

fs.writeFileSync('index.html', code);
console.log('Fixed korean encoding issues');
