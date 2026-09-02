const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const correctTiers = `        const tiers = [
            { name: "희귀", prob: 500, hpBase: 20, breakReward: 10, buyCost: 50, incomeBase: 1, color: "#a29bfe", items: ["지우개", "연필", "신용카드", "안경"] },
            { name: "초희귀", prob: 300, hpBase: 150, breakReward: 50, buyCost: 250, incomeBase: 5, color: "#74b9ff", items: ["공책", "백과사전", "책상", "덤벨"] },
            { name: "전설", prob: 140, hpBase: 2000, breakReward: 500, buyCost: 2500, incomeBase: 25, color: "#55efc4", items: ["베개", "변기", "문", "선풍기"] },
            { name: "신화", prob: 45, hpBase: 30000, breakReward: 10000, buyCost: 50000, incomeBase: 150, color: "#fdcb6e", items: ["범고래", "창", "시계"] },
            { name: "비밀", prob: 13, hpBase: 1000000, breakReward: 500000, buyCost: 2500000, incomeBase: 1000, color: "#ff7675", items: ["컴퓨터", "핸드폰", "건물", "생일 케이크"] },
            { name: "유니크", prob: 2, hpBase: 50000000, breakReward: 20000000, buyCost: 100000000, incomeBase: 10000, color: "#d63031", items: ["왕관", "대장장이의 망치"] },
            { name: "코스믹", prob: 0.5, hpBase: 500000000, breakReward: 200000000, buyCost: 1000000000, incomeBase: 100000, color: "#9b59b6", items: ["블랙홀", "우주선"] },
            { name: "디바인", prob: 0, hpBase: 5000000000, breakReward: 2000000000, buyCost: 10000000000, incomeBase: 1000000, color: "#ff9f43", items: ["수박"] },
            { name: "금지된", prob: 0, hpBase: 50000000000, breakReward: 20000000000, buyCost: 100000000000, incomeBase: 10000000, color: "#34495e", items: ["다이아몬드", "큐브", "금고"] },
            { name: "천상의", prob: 0, hpBase: 500000000000, breakReward: 200000000000, buyCost: 1000000000000, incomeBase: 100000000, color: "#f5f6fa", items: ["왁뿌볼"] }
        ];`;

const correctIcons = `        const itemIcons = {
            "지우개": "🧽", "연필": "✏️", "신용카드": "💳", "안경": "👓",
            "공책": "📓", "백과사전": "📚", "책상": "🪑", "덤벨": "🏋️",
            "베개": "🛌", "변기": "🚽", "문": "🚪", "선풍기": "🌀",
            "범고래": "🐳", "창": "🪟", "시계": "⌚",
            "컴퓨터": "💻", "핸드폰": "📱", "건물": "🏢", "생일 케이크": "🎂",
            "왕관": "👑", "대장장이의 망치": "🔨",
            "블랙홀": "🌌", "우주선": "🛸",
            "수박": "🍉",
            "다이아몬드": "💎", "큐브": "🧊", "금고": "🗄️",
            "왁뿌볼": "🔮"
        };`;

// Replace tiers
code = code.replace(/const tiers = \[[\s\S]*?\];/m, correctTiers);
// Replace icons
code = code.replace(/const itemIcons = \{[\s\S]*?\};/m, correctIcons);

const cheatCodeRegex = /if \(codeInput === "sorry"\) \{[\s\S]*?\} else \{/m;
const cheatCodeReplacement = `if (codeInput === "sorry" || codeInput === "restore_all") {
                redeemedCodes.push(codeInput);
                money += 500000000000;
                if (!inventory["수박"]) inventory["수박"] = 0;
                inventory["수박"] += 3;
                if (!weaponInventory[7]) weaponInventory[7] = {4: 1};
                else weaponInventory[7][4] = 1;
                
                // Restore lost items by migrating corrupted names to original ones if they exist
                if (inventory["아령"]) { inventory["덤벨"] = (inventory["덤벨"]||0) + inventory["아령"]; delete inventory["아령"]; }
                if (inventory["차"]) { inventory["문"] = (inventory["문"]||0) + inventory["차"]; delete inventory["차"]; }
                if (inventory["집"]) { inventory["창"] = (inventory["창"]||0) + inventory["집"]; delete inventory["집"]; }
                if (inventory["안드로이드"]) { inventory["핸드폰"] = (inventory["핸드폰"]||0) + inventory["안드로이드"]; delete inventory["안드로이드"]; }
                if (inventory["별"]) { inventory["왕관"] = (inventory["왕관"]||0) + inventory["별"]; delete inventory["별"]; }
                
                equippedInventory = {}; // Reset equipped to avoid bugs
                
                // Force break current item to reset UI state
                currentHp = 0;
                
                calcClickDamage();
                updateUI();
                saveGame();
                showSystemMessage("전면 복구 완료! (돈, 수박 3개, 4성 무기 지급, 꼬인 아이템 정리)", "#1abc9c");
                closeModal('codeModal');
                
                // Force spawn a new healthy item
                setTimeout(() => { spawnItem(); }, 100);
            } else {`;

code = code.replace(cheatCodeRegex, cheatCodeReplacement);

fs.writeFileSync('index.html', code);
console.log('Fixed Tiers, Icons, and Cheat Code');
