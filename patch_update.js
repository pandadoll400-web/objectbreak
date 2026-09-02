const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Update Tiers & Icons
const tiersRegex = /const tiers = \[[\s\S]*?\];/;
const newTiers = `const tiers = [
            { name: "희귀", prob: 500, hpBase: 20, breakReward: 10, buyCost: 50, incomeBase: 1, color: "#a29bfe", items: ["지우개", "연필", "신용카드", "안경"] },
            { name: "초희귀", prob: 300, hpBase: 150, breakReward: 50, buyCost: 250, incomeBase: 5, color: "#74b9ff", items: ["공책", "백과사전", "책상", "덤벨"] },
            { name: "전설", prob: 140, hpBase: 2000, breakReward: 500, buyCost: 2500, incomeBase: 25, color: "#55efc4", items: ["베개", "변기", "문", "선풍기"] },
            { name: "신화", prob: 45, hpBase: 30000, breakReward: 10000, buyCost: 50000, incomeBase: 150, color: "#fdcb6e", items: ["범고래", "창", "시계"] },
            { name: "비밀", prob: 13, hpBase: 1000000, breakReward: 500000, buyCost: 2500000, incomeBase: 1000, color: "#ff7675", items: ["컴퓨터", "핸드폰", "건물", "생일 케이크"] },
            { name: "유니크", prob: 2, hpBase: 50000000, breakReward: 20000000, buyCost: 100000000, incomeBase: 10000, color: "#d63031", items: ["왕관", "대장장이의 망치"] },
            { name: "코스믹", prob: 0.5, hpBase: 500000000, breakReward: 200000000, buyCost: 1000000000, incomeBase: 100000, color: "#9b59b6", items: ["블랙홀", "우주선"] },
            { name: "디바인", prob: 0, hpBase: 5000000000, breakReward: 2000000000, buyCost: 10000000000, incomeBase: 1000000, color: "#ff9f43", items: ["수박"] },
            { name: "금지된", prob: 0, hpBase: 50000000000, breakReward: 20000000000, buyCost: 100000000000, incomeBase: 10000000, color: "#34495e", items: ["왁뿌볼", "마계의 눈", "흑염룡"] },
            { name: "천상의", prob: 0, hpBase: 500000000000, breakReward: 200000000000, buyCost: 1000000000000, incomeBase: 100000000, color: "#f5f6fa", items: ["천사의 날개", "신의 지팡이", "성배"] }
        ];`;
code = code.replace(tiersRegex, newTiers);

const iconsRegex = /const itemIcons = \{[\s\S]*?\};/;
const newIcons = `const itemIcons = {
            "지우개": "🧽", "연필": "✏️", "신용카드": "💳", "안경": "👓",
            "공책": "📓", "백과사전": "📚", "책상": "🪑", "덤벨": "🏋️",
            "베개": "🛌", "변기": "🚽", "문": "🚪", "선풍기": "🌀",
            "범고래": "🐳", "창": "🪟", "시계": "⌚",
            "컴퓨터": "💻", "핸드폰": "📱", "건물": "🏢", "생일 케이크": "🎂",
            "왕관": "👑", "대장장이의 망치": "🔨",
            "블랙홀": "🌌", "우주선": "🛸",
            "수박": "🍉",
            "왁뿌볼": "🔮", "마계의 눈": "👁️", "흑염룡": "🐉",
            "천사의 날개": "🪽", "신의 지팡이": "🦯", "성배": "🏆"
        };`;
code = code.replace(iconsRegex, newIcons);

// 2. Update spawnItem logic
const spawnItemRegex = /function spawnItem\(\) \{[\s\S]*?isSpawning = false; \/\/ Prevent permanent freeze\n            \}\n        \}/;
const newSpawnItem = `function spawnItem() {
            try {
                isSpawning = true;
                let rand = Math.random();
                let selectedTier;
                
                if (currentWorld === 3) {
                    // 디바인 95%, 코스믹 4%, 천상의 0.9%, 금지된 0.1%
                    if (rand < 0.95) selectedTier = tiers.find(t => t.name === "디바인");
                    else if (rand < 0.99) selectedTier = tiers.find(t => t.name === "코스믹");
                    else if (rand < 0.999) selectedTier = tiers.find(t => t.name === "천상의");
                    else selectedTier = tiers.find(t => t.name === "금지된");
                } else if (currentWorld === 2) {
                    // 전설/신화 94%, 비밀 5.7%, 디바인 0.3%
                    if (rand < 0.94) {
                        selectedTier = Math.random() < 0.7 ? tiers.find(t => t.name === "전설") : tiers.find(t => t.name === "신화");
                    }
                    else if (rand < 0.997) selectedTier = tiers.find(t => t.name === "비밀");
                    else selectedTier = tiers.find(t => t.name === "디바인");
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
                }
                
                if (!selectedTier) selectedTier = tiers[0];
                
                // 생일 케이크 자연 스폰 금지
                let availableItems = selectedTier.items.filter(item => item !== "생일 케이크");
                if (availableItems.length === 0) availableItems = selectedTier.items;
                
                let selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
                
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
                isSpawning = false; 
            }
        }`;
code = code.replace(spawnItemRegex, newSpawnItem);

// 3. Update renderShop logic
const renderShopRegex = /function renderShop\(\) \{[\s\S]*?document\.getElementById\('shopList'\)\.innerHTML = html;\n        \}/;
const newRenderShop = `function renderShop() {
            let html = '';
            for (let w of weapons) {
                if (w.id === 1) continue; 
                
                // 월드에 따른 상점 무기 필터링
                // 1세계: 풍월도(8) 까지만
                if (currentWorld === 1 && w.id > 8) continue;
                // 2세계: 1세계 무기 가리고, 11(신살검)까지만. 캐로베로스의 명검(12)은 제외
                if (currentWorld === 2 && (w.id < 9 && w.id !== 8) && w.id > 11) continue; 
                if (currentWorld === 2 && w.id === 12) continue;
                // 3세계: 9 이상 고급 무기만 + 캐로베로스의 명검
                if (currentWorld === 3 && w.id < 9) continue;

                let canBuy = money >= w.cost;
                
                let countStr = "";
                let totalCount = 0;
                if(weaponInventory[w.id]) {
                    for(let s in weaponInventory[w.id]) {
                        totalCount += weaponInventory[w.id][s];
                    }
                }
                if(totalCount > 0) countStr = \`<span style="font-size:12px; color:#aaa; margin-left: 5px;">(보유: \${totalCount}개)</span>\`;
                
                let btnHtml = canBuy 
                    ? \`<button onclick="buyWeapon(\${w.id}, \${w.cost})">\${w.cost.toLocaleString()}원 구매</button>\`
                    : \`<button disabled>\${w.cost.toLocaleString()}원 구매</button>\`;

                html += \`
                <div class="list-item">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size:28px; margin-right: 15px;">\${w.icon}</span>
                        <div>
                            <strong style="font-size:18px;">\${w.name}</strong>\${countStr}<br>
                            <span style="font-size:14px; color:#f1c40f;">기본 데미지: +\${w.damage.toLocaleString()}</span>
                        </div>
                    </div>
                    \${btnHtml}
                </div>\`;
            }
            document.getElementById('shopList').innerHTML = html;
        }`;
code = code.replace(renderShopRegex, newRenderShop);

fs.writeFileSync('index.html', code);
console.log('Update logic applied');
