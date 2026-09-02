const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Update Tiers
const tiersStrOld = `        const tiers = [
            { name: "일반", prob: 500, hpBase: 20, breakReward: 10, buyCost: 50, incomeBase: 1, color: "#a29bfe", items: ["지우개", "연필", "신용카드", "안경"] },
            { name: "초희귀", prob: 300, hpBase: 150, breakReward: 50, buyCost: 250, incomeBase: 5, color: "#74b9ff", items: ["공책", "백과사전", "책상", "아령"] },
            { name: "전설", prob: 140, hpBase: 2000, breakReward: 500, buyCost: 2500, incomeBase: 25, color: "#55efc4", items: ["베개", "변기", "차", "선풍기"] },
            { name: "신화", prob: 45, hpBase: 30000, breakReward: 10000, buyCost: 50000, incomeBase: 150, color: "#fdcb6e", items: ["범고래", "집", "시계"] },
            { name: "비밀", prob: 13, hpBase: 1000000, breakReward: 500000, buyCost: 2500000, incomeBase: 1000, color: "#ff7675", items: ["컴퓨터", "핸드폰", "건물", "생일 케이크"] },
            { name: "유니크", prob: 2, hpBase: 50000000, breakReward: 20000000, buyCost: 100000000, incomeBase: 10000, color: "#d63031", items: ["달"] },
            { name: "코스믹", prob: 0.5, hpBase: 500000000, breakReward: 200000000, buyCost: 1000000000, incomeBase: 100000, color: "#9b59b6", items: ["블랙홀", "우주선"] },
            { name: "디바인", prob: 0, hpBase: 5000000000, breakReward: 2000000000, buyCost: 10000000000, incomeBase: 1000000, color: "#ff9f43", items: ["왁뿌볼"] }
        ];`;

const tiersStrNew = `        const tiers = [
            { name: "일반", prob: 500, hpBase: 20, breakReward: 10, buyCost: 50, incomeBase: 1, color: "#a29bfe", items: ["지우개", "연필", "신용카드", "안경"] },
            { name: "초희귀", prob: 300, hpBase: 150, breakReward: 50, buyCost: 250, incomeBase: 5, color: "#74b9ff", items: ["공책", "백과사전", "책상", "아령"] },
            { name: "전설", prob: 140, hpBase: 2000, breakReward: 500, buyCost: 2500, incomeBase: 25, color: "#55efc4", items: ["베개", "변기", "차", "선풍기"] },
            { name: "신화", prob: 45, hpBase: 30000, breakReward: 10000, buyCost: 50000, incomeBase: 150, color: "#fdcb6e", items: ["범고래", "집", "시계"] },
            { name: "비밀", prob: 13, hpBase: 1000000, breakReward: 500000, buyCost: 2500000, incomeBase: 1000, color: "#ff7675", items: ["컴퓨터", "핸드폰", "건물", "생일 케이크"] },
            { name: "유니크", prob: 2, hpBase: 50000000, breakReward: 20000000, buyCost: 100000000, incomeBase: 10000, color: "#d63031", items: ["달"] },
            { name: "코스믹", prob: 0.5, hpBase: 500000000, breakReward: 200000000, buyCost: 1000000000, incomeBase: 100000, color: "#9b59b6", items: ["블랙홀", "우주선"] },
            { name: "디바인", prob: 0, hpBase: 5000000000, breakReward: 2000000000, buyCost: 10000000000, incomeBase: 1000000, color: "#ff9f43", items: ["수박"] },
            { name: "금지된", prob: 0, hpBase: 50000000000, breakReward: 20000000000, buyCost: 100000000000, incomeBase: 10000000, color: "#34495e", items: ["다이아몬드", "큐브", "금고"] },
            { name: "천상의", prob: 0, hpBase: 500000000000, breakReward: 200000000000, buyCost: 1000000000000, incomeBase: 100000000, color: "#f5f6fa", items: ["왁뿌볼"] }
        ];`;

// Let's rely on regex if exact string is slightly off due to encoding.
code = code.replace(/const tiers = \[[\s\S]*?\];/, tiersStrNew);

// 2. Update Weapons
code = code.replace(/\{ id: 11, name: "신살검", cost: 25000000000, damage: 70000000, icon: "🗡️" \}/, 
`{ id: 11, name: "신살검", cost: 25000000000, damage: 70000000, icon: "🗡️" },
            { id: 12, name: "캐로베로스의 명검", cost: 250000000000, damage: 7000000000, icon: "⚔️" }`);

// 3. Update Item Icons
const itemIconsStr = `        const itemIcons = {
            "지우개": "🧽", "연필": "✏️", "신용카드": "💳", "안경": "👓",
            "공책": "📓", "백과사전": "📚", "책상": "🪑", "아령": "🏋️",
            "베개": "🛌", "변기": "🚽", "차": "🚗", "선풍기": "🌀",
            "범고래": "🐳", "집": "🏠", "시계": "⌚",
            "컴퓨터": "💻", "핸드폰": "📱", "건물": "🏢", "생일 케이크": "🎂",
            "달": "🌙",
            "블랙홀": "🌌", "우주선": "🚀",
            "수박": "🍉",
            "다이아몬드": "💎", "큐브": "🧊", "금고": "🗄️",
            "왁뿌볼": "🔮"
        };`;
code = code.replace(/const itemIcons = \{[\s\S]*?\};/, itemIconsStr);

// 4. Update World 3 Button in Modal
const w3BtnRegex = /<div id="world3Btn"[\s\S]*?<\/div>/;
const w3BtnNew = `<div id="world3Btn" onclick="goToWorld(3)" style="background-color: #333; padding: 15px; border: 3px dashed #ff9f43; border-radius: 8px; margin-top: 20px; cursor: pointer; transition: 0.2s;">
                    <h3 style="color: #f1c40f; margin: 0; font-size: 24px; -webkit-text-stroke: 1px black;">🪐 3세계 (관리자만 가능)</h3>
                    <p id="world3Req" style="color: #ff9f43; margin-top: 5px; margin-bottom: 0; font-size: 14px; font-weight: bold;">해금 조건: 디바인 아이템 3개 보유</p>
                </div>`;
code = code.replace(w3BtnRegex, w3BtnNew);

// 5. Update goToWorld Logic
const goToWorldRegex = /function goToWorld\(worldId\) \{[\s\S]*?function submitCode/m;
const goToWorldNew = `function goToWorld(worldId) {
            if (worldId === 3) {
                // Check Divine items condition first
                const divineItems = ["수박"]; // list of divine items
                let divineCount = 0;
                divineItems.forEach(item => {
                    let totalNames = [item, "[천악] " + item];
                    totalNames.forEach(n => {
                        if (inventory[n]) divineCount += inventory[n];
                    });
                });
                
                // If the user already had Wakppubol as Divine in World 1 before update, we should count it too so they don't lose progress
                if (inventory["왁뿌볼"]) divineCount += inventory["왁뿌볼"];
                if (inventory["[천악] 왁뿌볼"]) divineCount += inventory["[천악] 왁뿌볼"];

                if (divineCount < 3) {
                    showSystemMessage("해금 조건을 만족하지 못했습니다! (디바인 아이템 3개 필요)", "#e74c3c");
                    return;
                }

                const pwd = prompt("비밀번호를 입력하세요:");
                if (pwd !== "20130620") {
                    showSystemMessage("비밀번호가 틀렸습니다.", "#e74c3c");
                    return;
                }
            }

            if (worldId === currentWorld) return;
            
            if (worldId === 2) {
                const hasPlasma4 = (weaponInventory[7] && weaponInventory[7][4] >= 1);
                if (!hasPlasma4) {
                    showSystemMessage("해금 조건을 만족하지 못했습니다!", "#e74c3c");
                    return;
                }
            }

            currentWorld = worldId;
            if (worldId === 3) {
                showSystemMessage(\`👼😈 천사악마 지형에 입장하셨습니다!\`, "#9b59b6");
            } else {
                showSystemMessage(\`🪐 \${worldId}세계로 이동했습니다!\`, "#9b59b6");
            }
            saveGame();
            closeModal('worldModal');
            
            document.body.style.transition = "background 1s";
            if (worldId === 2) {
                document.body.style.background = "#1e0b29";
                document.getElementById('btnSynth').style.display = "none";
                document.getElementById('btnUpdate').style.display = "none";
            } else if (worldId === 3) {
                // 천사악마 지형 (왼쪽 흰색/금색 천사 + 오른쪽 검정/빨강 악마)
                document.body.style.background = "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(241,196,15,0.8) 50%, rgba(231,76,60,0.8) 50%, rgba(20,20,20,0.95) 100%)";
                document.getElementById('btnSynth').style.display = "none";
                document.getElementById('btnUpdate').style.display = "none";
            } else {
                document.body.style.background = "#2c3e50";
                document.getElementById('btnSynth').style.display = "block";
                document.getElementById('btnUpdate').style.display = "block";
            }
            
            renderShop();
            if (currentItem) breakItem(true); 
            spawnItem();
        }

        function submitCode`;

code = code.replace(goToWorldRegex, goToWorldNew);

// 6. Update spawnItem Logic
const spawnItemRegex = /let selectedItem = selectedTier\.items\[Math\.floor\(Math\.random\(\) \* selectedTier\.items\.length\)\];\s*currentItem = {[\s\S]*?};/m;
const spawnItemNew = `let selectedItem = selectedTier.items[Math.floor(Math.random() * selectedTier.items.length)];
            
            if (currentWorld === 3) {
                selectedItem = "[천악] " + selectedItem;
            }

            currentItem = {
                name: selectedItem,
                tier: selectedTier,
                maxHp: maxHp,
                baseName: selectedItem.replace('[천악] ', '')
            };`;
code = code.replace(spawnItemRegex, spawnItemNew);

// 6.b Update the probability logic inside spawnItem
// Currently:
// if (currentWorld === 2) {
//     if (rand < 0.1) selectedTier = tiers.find(t => t.name === "디바인") || tiers[tiers.length - 1];
// ...
// We need to make sure World 3 uses standard tier generation logic, but only drops Secret or higher.
// "적어도 비밀 아님 그 윗단계가 뜨게해주고" "거기는 1세계처럼 골고루 뜨게해"
const tierLogicRegex = /if \(currentWorld === 2\) \{[\s\S]*?\} else \{[\s\S]*?\}/m;

const tierLogicNew = `if (currentWorld === 3) {
                // World 3 only drops Secret or higher. (Secret, Unique, Cosmic, Divine, Forbidden, Celestial)
                // Filter tiers to Secret or higher
                let allowedTiers = tiers.slice(4); // from index 4 (비밀) to the end
                
                // Distribute evenly among allowed tiers? "1세계처럼 골고루 뜨게해"
                // Meaning the relative probabilities among them should be normal, but scaled up so they total 1.
                let totalProb = allowedTiers.reduce((sum, t) => sum + t.prob, 0);
                
                // Wait, some have 0 prob (Divine, Forbidden, Celestial). So normal distribution won't let them drop.
                // We should make them drop evenly, e.g., 20% each, or give them standard fallback probabilities.
                // If they meant "just give each one an equal chance":
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
            }`;
code = code.replace(tierLogicRegex, tierLogicNew);

// 7. Update display rendering in spawnItem and breakItem to use baseName
// `display.innerText = itemIcons[currentItem.name] || "📦";` -> `display.innerText = itemIcons[currentItem.baseName] || "📦";`
code = code.replace(/display\.innerText = itemIcons\[currentItem\.name\]/g, "display.innerText = itemIcons[currentItem.baseName]");

// 8. Update renderShop to include Weapon 12 in World 3
// Find `if (currentWorld === 2)` inside renderShop and update logic
const renderShopRegex = /if \(currentWorld === 2\) \{[\s\S]*?else \{[\s\S]*?worldWeapons = weapons\.filter\(w => w\.id < 9\);[\s\S]*?\}/;
const renderShopNew = `if (currentWorld === 3) {
                // World 3 shop
                worldWeapons = weapons.filter(w => w.id === 12);
            } else if (currentWorld === 2) {
                // World 2 shop
                worldWeapons = weapons.filter(w => w.id >= 9 && w.id <= 11);
            } else {
                // World 1 shop
                worldWeapons = weapons.filter(w => w.id < 9);
            }`;
code = code.replace(renderShopRegex, renderShopNew);

// 9. Update initial load / updateUI to handle UI properly
// function updateUI() -> document.getElementById('world1Status').innerText = (currentWorld === 1) ? "(현재 접속 중)" : "";
// Also we need to make sure the world 3 UI is shown if currentWorld === 3
const updateUIRegex = /w1Stat\.style\.color = "#fff";[\s\S]*?w2Btn\.style\.boxShadow = "none";\s*\}/m;
const updateUINew = `w1Stat.style.color = "#fff";
            } else {
                w1Btn.style.border = "3px solid #000";
                w1Btn.style.boxShadow = "none";
                w1Stat.innerText = "";
            }

            if (currentWorld === 2) {
                w2Btn.style.border = "3px solid #f1c40f";
                w2Btn.style.boxShadow = "0 0 10px rgba(241, 196, 15, 0.5)";
                w2Stat.innerText = "(현재 접속 중)";
                w2Stat.style.color = "#fff";
            } else {
                w2Btn.style.border = "3px solid #000";
                w2Btn.style.boxShadow = "none";
                w2Stat.innerText = "";
            }
            
            const w3Btn = document.getElementById('world3Btn');
            const w3Req = document.getElementById('world3Req');
            if (currentWorld === 3) {
                w3Btn.style.border = "3px solid #9b59b6";
                w3Btn.style.boxShadow = "0 0 10px rgba(155, 89, 182, 0.5)";
                if (w3Req) w3Req.innerText = "(현재 접속 중)";
                if (w3Req) w3Req.style.color = "#fff";
            } else {
                w3Btn.style.border = "3px dashed #ff9f43";
                w3Btn.style.boxShadow = "none";
                if (w3Req) w3Req.innerText = "해금 조건: 디바인 아이템 3개 보유";
                if (w3Req) w3Req.style.color = "#ff9f43";
            }`;
code = code.replace(/w1Stat\.style\.color = "#fff";[\s\S]*?w2Btn\.style\.boxShadow = "none";\s*\}/m, updateUINew);


fs.writeFileSync('index.html', code);
console.log('Patch complete.');
