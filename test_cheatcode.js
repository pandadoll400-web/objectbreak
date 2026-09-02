
    let document = {
        getElementById: (id) => {
            return {
                style: {},
                innerText: '',
                innerHTML: '',
                classList: { add: () => {}, remove: () => {} },
                value: 'restore_all'
            };
        },
        body: { appendChild: () => {}, style: {} },
        createElement: () => ({ style: {}, innerText: '', classList: { add: () => {}, remove: () => {} } })
    };
    let window = { serverEventData: {}, onclick: () => {}, onerror: () => {} };
    let location = { reload: () => {} };
    let localStorage = { getItem: () => null, setItem: () => {} };


        window.onerror = function(msg, url, lineNo, columnNo, error) {
            let errStr = "Error: " + msg + " at line " + lineNo;
            showSystemMessage("🚨 시스템 오류 발생! " + errStr, "#e74c3c");
            console.error(errStr, error);
            return false;
        };



                                const tiers = [
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
        ];

                const weapons = [
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
        ];

                                const itemIcons = {
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
        };

        let money = 0;
        let currentWorld = 1;
        const GAME_VERSION = 1.0;
        let clickDamage = 1;
        let inventory = {};      
        let equippedInventory = {}; // 장착된 아이템 목록
        let weaponInventory = { 1: {0: 1} };

        let currentItem = null;
        let currentHp = 0;
        let maxHp = 0;
        
        let currentMaxTime = 20; 
        let timeLeft = currentMaxTime;
        let isSpawning = false; 
        
        let pendingDrops = []; 
        let redeemedCodes = [];
        
        // 럭 이벤트 & 특성 상태
        let isLuckEvent = false;
        let luckEndTime = 0;
        let luckMultiplier = 1;

        let isPhoenixActive = false;
        let phoenixInterval = null;
        let isItemBurning = false;
        // 핫 리로딩(새로고침 없이 이벤트/특성 감지)
        function pollEvent() {
            const script = document.createElement('script');
            script.src = 'event_data.js?v=' + Date.now();
            script.onload = () => {
                script.remove();
                
                if (window.serverEventData && window.serverEventData.version && window.serverEventData.version > GAME_VERSION) {
                    showSystemMessage("🚨 신규 업데이트가 감지되었습니다! 시스템이 자동으로 재시작됩니다...", "#e74c3c");
                    saveGame();
                    setTimeout(() => location.reload(true), 3000);
                    return; // 업데이트 중이므로 기존 이벤트 처리는 중단
                }

                if (window.serverEventData && window.serverEventData.active && Date.now() < window.serverEventData.endTime) {
                    let timeLeftEvent = Math.floor((window.serverEventData.endTime - Date.now()) / 1000);
                    let mins = Math.floor(timeLeftEvent / 60);
                    let secs = timeLeftEvent % 60;
                    let timeStr = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
                    
                    document.getElementById('luckEventUI').style.display = 'block';

                    // 특성 및 이벤트 분리
                    if (window.serverEventData.trait === 'phoenix') {
                        isLuckEvent = false; // 럭 이벤트 아님 (6배 미적용)
                        if (!isPhoenixActive) startPhoenixMode();
                        if (isCatActive) stopCatMode();
                        
                        const luckUI = document.getElementById('luckEventUI');
                        luckUI.style.background = '';
                        luckUI.classList.add('phoenix-ui');
                        document.getElementById('luckIcon').innerText = '🦅🔥';
                        document.getElementById('luckTitle').innerText = '피닉스 특성!';
                        document.getElementById('luckTitle').style.color = '#fff';
                        document.getElementById('luckSub').innerText = '수입 2.5배 UP!';
                        document.getElementById('luckEventTimer').innerText = timeStr;
                        
                    } else if (window.serverEventData.trait === 'both') {
                        isLuckEvent = false; 
                        if (!isPhoenixActive) startPhoenixMode();
                        if (!isCatActive) startCatMode();
                        
                        const luckUI = document.getElementById('luckEventUI');
                        luckUI.classList.remove('phoenix-ui');
                        luckUI.style.background = 'linear-gradient(45deg, #e74c3c, #9b59b6)';
                        document.getElementById('luckIcon').innerText = '🦅🐱';
                        document.getElementById('luckTitle').innerText = '피닉스 & 고양이!';
                        document.getElementById('luckTitle').style.color = '#fff';
                        document.getElementById('luckSub').innerText = '초토화 모드!';
                        document.getElementById('luckEventTimer').innerText = timeStr;
                        
                    } else if (window.serverEventData.trait === 'cat') {
                        isLuckEvent = false; // 럭 이벤트 아님 (6배 미적용)
                        if (!isCatActive) startCatMode();
                        if (isPhoenixActive) stopPhoenixMode();
                        
                        const luckUI = document.getElementById('luckEventUI');
                        luckUI.classList.remove('phoenix-ui');
                        luckUI.style.background = 'linear-gradient(45deg, #8e44ad, #9b59b6)';
                        document.getElementById('luckIcon').innerText = '🐱✨';
                        document.getElementById('luckTitle').innerText = '고양이 특성!';
                        document.getElementById('luckTitle').style.color = '#fff';
                        document.getElementById('luckSub').innerText = '수입 3배 UP!';
                        document.getElementById('luckEventTimer').innerText = timeStr;
                        
                    } else {
                        // 일반 럭키 타임 (특성 아님)
                        isLuckEvent = true;
                        luckMultiplier = window.serverEventData.multiplier || 1;
                        if (isPhoenixActive) stopPhoenixMode();
                        if (isCatActive) stopCatMode();
                        
                        const luckUI = document.getElementById('luckEventUI');
                        luckUI.classList.remove('phoenix-ui');
                        luckUI.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                        document.getElementById('luckIcon').innerText = '🍀';
                        document.getElementById('luckTitle').innerText = '럭키 타임!';
                        document.getElementById('luckTitle').style.color = '#f1c40f';
                        document.getElementById('luckSub').innerText = `비밀/코스믹 ${luckMultiplier}배 UP!`;
                        document.getElementById('luckEventTimer').innerText = timeStr;
                    }
                } else {
                    isLuckEvent = false;
                    document.getElementById('luckEventUI').style.display = 'none';
                    if (isPhoenixActive) stopPhoenixMode();
                    if (isCatActive) stopCatMode();
                }
            };
            script.onerror = () => { script.remove(); };
            document.head.appendChild(script);
        }
        setInterval(pollEvent, 2500);

        function startPhoenixMode() {
            isPhoenixActive = true;
            currentMaxTime = 40; 
            if (timeLeft < 40) timeLeft += (40 - 20); 
            
            // 피닉스 전용 UI 테마
            const luckUI = document.getElementById('luckEventUI');
            luckUI.classList.add('phoenix-ui');
            document.getElementById('luckIcon').innerText = '🦅🔥';
            document.getElementById('luckTitle').innerText = '피닉스 특성!';
            document.getElementById('luckTitle').style.color = '#fff';
            
            showSystemMessage("🦅 피닉스 특성 발동!", "#e67e22");
            
            phoenixInterval = setInterval(spawnPhoenixBird, 2000);
        }

        function stopPhoenixMode() {
            if(!isPhoenixActive) return;
            isPhoenixActive = false;
            currentMaxTime = 20;
            if (timeLeft > 20) timeLeft = 20;
            
            const luckUI = document.getElementById('luckEventUI');
            luckUI.classList.remove('phoenix-ui');
            document.getElementById('luckIcon').innerText = '🍀';
            document.getElementById('luckTitle').innerText = '럭키 타임!';
            document.getElementById('luckTitle').style.color = '#f1c40f';
            
            clearInterval(phoenixInterval);
            
            isItemBurning = false;
            document.getElementById('itemDisplay').classList.remove('item-burning');
        }

        // 고양이 특성 로직 (9월 4일 이후 활성화 가능)
        let isCatActive = false;
        let catInterval = null;

        function startCatMode() {
            if (Date.now() < new Date("2026-09-04T16:00:00+09:00").getTime()) {
                showSystemMessage("🐱 고양이 특성은 9월 4일 금요일 4시 이후에 활성화됩니다!", "#e74c3c");
                return;
            }
            isCatActive = true;
            showSystemMessage("🐱 고양이 특성 발동! 고양이들이 물건을 마구 때립니다!", "#9b59b6");
            
            catInterval = setInterval(spawnCatWorker, 600);
        }

        function stopCatMode() {
            if(!isCatActive) return;
            isCatActive = false;
            clearInterval(catInterval);
        }

        function spawnCatWorker() {
            if (!isCatActive || !currentItem || currentHp <= 0) return;
            const el = document.createElement('div');
            el.innerText = '🐈';
            el.style.position = 'fixed';
            el.style.fontSize = '50px';
            let isLeft = Math.random() > 0.5;
            el.style.left = (isLeft ? -50 : window.innerWidth + 50) + 'px';
            el.style.top = (Math.random() * window.innerHeight) + 'px';
            if (!isLeft) el.style.transform = 'scaleX(-1)';
            el.style.transition = 'all 0.4s ease-in';
            el.style.zIndex = '50';
            el.style.pointerEvents = 'none';
            document.body.appendChild(el);
            
            setTimeout(() => {
                const target = document.getElementById('itemDisplay').getBoundingClientRect();
                el.style.left = (target.left + target.width/2 - 25 + (Math.random()*40 - 20)) + 'px';
                el.style.top = (target.top + target.height/2 - 25 + (Math.random()*40 - 20)) + 'px';
                
                setTimeout(() => {
                    let scratchCount = 0;
                    let scratchInterval = setInterval(() => {
                        if (!isCatActive || !currentItem || currentHp <= 0 || scratchCount >= 5) {
                            clearInterval(scratchInterval);
                            el.remove();
                            return;
                        }
                        el.innerText = scratchCount % 2 === 0 ? '💥' : '🐈';
                        currentHp -= clickDamage * 0.2; // 0.2씩 5번 타격
                        showDamageText(target.left + 50, target.top + 50, Math.floor(clickDamage * 0.2));
                        if (currentHp <= 0) breakItem();
                        else updateHpBar();
                        scratchCount++;
                    }, 250);
                }, 400);
            }, 50);
        }

        function spawnPhoenixBird() {
            if(!isPhoenixActive) return;
            const el = document.createElement('div');
            el.className = 'phoenix-bird';
            el.innerText = '🦅🔥';
            
            let isLeft = Math.random() > 0.5;
            let startX = isLeft ? -100 : window.innerWidth + 50;
            let startY = Math.random() * (window.innerHeight - 300) + 100;
            
            el.style.left = startX + 'px';
            el.style.top = startY + 'px';
            if(!isLeft) el.style.transform = 'scaleX(-1)';
            
            document.body.appendChild(el);
            
            // 확률적으로 타겟 물건에 스치기 (25%)
            let hitsItem = Math.random() < 0.25;
            
            setTimeout(() => {
                el.style.opacity = '1';
                let endX, endY;
                if(hitsItem) {
                    const itemRect = document.getElementById('itemDisplay').getBoundingClientRect();
                    endX = itemRect.left + itemRect.width/2 - 30;
                    endY = itemRect.top + itemRect.height/2 - 30;
                    
                    setTimeout(() => {
                        igniteItem();
                        // 치고 위로 날아가기
                        el.style.transition = 'all 2s ease-in';
                        el.style.left = (isLeft ? window.innerWidth + 100 : -100) + 'px';
                        el.style.top = '-150px';
                    }, 4000); 
                } else {
                    endX = isLeft ? window.innerWidth + 100 : -100;
                    endY = startY + (Math.random() * 400 - 200);
                }
                
                el.style.left = endX + 'px';
                el.style.top = endY + 'px';
                
            }, 100);
            
            setTimeout(() => el.remove(), 8000);
        }

        function igniteItem() {
            if(!currentItem || currentHp <= 0) return;
            if(!isItemBurning) {
                isItemBurning = true;
                document.getElementById('itemDisplay').classList.add('item-burning');
                showSystemMessage("🔥 피닉스가 스쳤습니다! (파괴 시 추가 30% 보너스!)", "#e74c3c");
            }
        }

        setInterval(() => {
            if (isLuckEvent || isPhoenixActive) {
                let remain = Math.floor((luckEndTime - Date.now()) / 1000);
                if (remain <= 0) {
                    isLuckEvent = false;
                    document.getElementById('luckEventUI').style.display = 'none';
                    if (isPhoenixActive) stopPhoenixMode();
                } else {
                    let m = Math.floor(remain / 60).toString().padStart(2, '0');
                    let s = (remain % 60).toString().padStart(2, '0');
                    document.getElementById('luckEventTimer').innerText = `${m}:${s}`;
                }
            }
        }, 1000);

        function showSaveIndicator() {
            const ind = document.getElementById('saveIndicator');
            ind.style.opacity = '1';
            setTimeout(() => { ind.style.opacity = '0'; }, 500);
        }

        function getDmgForStar(baseDmg, star) {
            return Math.floor(baseDmg * (1 + 0.2 * star));
        }

        function calcClickDamage() {
            let maxDmg = 1; 
            for (let wId in weaponInventory) {
                let weaponBase = weapons.find(w => w.id === parseInt(wId));
                if (!weaponBase) continue;
                for (let star in weaponInventory[wId]) {
                    if (weaponInventory[wId][star] > 0) {
                        let currentDmg = getDmgForStar(weaponBase.damage, parseInt(star));
                        if (currentDmg > maxDmg) maxDmg = currentDmg;
                    }
                }
            }
            clickDamage = maxDmg;
        }

        function saveGame() {
            const state = {
                money: money,
                currentWorld: currentWorld,
                inventory: inventory,
                equippedInventory: equippedInventory,
                weaponInventory: weaponInventory,
                currentItem: currentItem,
                currentHp: currentHp,
                maxHp: maxHp,
                timeLeft: timeLeft,
                pendingDrops: pendingDrops,
                luckEndTime: luckEndTime,
                luckMultiplier: luckMultiplier,
                isLuckEvent: isLuckEvent,
                redeemedCodes: redeemedCodes
            };
            try {
                localStorage.setItem('breakGameState', JSON.stringify(state));
                showSaveIndicator();
            } catch(e) {
                console.error("Save error:", e);
            }
        }

        function loadGame() {
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
                    document.getElementById('itemTier').innerText = `[${currentItem.tier.name}]`;
                    document.getElementById('itemTier').style.color = currentItem.tier.color;
                    
                    const display = document.getElementById('itemDisplay');
                    let baseName = currentItem.name.replace('[천악] ', '');
                    display.innerText = itemIcons[baseName] || "📦";
                    display.style.boxShadow = `inset 0 0 25px ${currentItem.tier.color}40, 0 0 15px ${currentItem.tier.color}60`;
                    display.style.border = `2px solid ${currentItem.tier.color}`;
                    
                    updateHpBar();
                    updateTimerBar();
                    return true; 
                }
            } catch (e) {
                console.error("Load error:", e);
            }
            return false;
        }

        function showDamageText(x, y, dmg) {
            const el = document.createElement('div');
            el.className = 'floating-dmg';
            el.innerText = '-' + dmg;
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 800);
        }

        function hitItem(e) {
            if (!currentItem || currentHp <= 0 || isSpawning) return;
            if (e.type === 'touchstart') e.preventDefault(); 
            
            currentHp -= clickDamage;

            let x, y;
            if (e.type === 'touchstart') {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else {
                x = e.clientX;
                y = e.clientY;
            }
            
            x += (Math.random() * 30 - 15);
            y += (Math.random() * 30 - 15);
            showDamageText(x, y, clickDamage);

            if (currentHp <= 0) {
                breakItem();
            } else {
                updateHpBar();
            }
        }

        function spawnDropElement(itemObj, isLoaded = false) {
            const dropZone = document.getElementById('dropZone');
            const el = document.createElement('div');
            el.className = 'dropped-item';
            
            let dropId = Math.random().toString(36).substr(2, 9);
            if (!isLoaded) {
                pendingDrops.push({ id: dropId, name: itemObj.name });
            } else {
                dropId = "loaded_" + Math.random();
                pendingDrops.push({ id: dropId, name: itemObj.name });
            }

            // 부서지는 물건 바로 양옆에 드랍되도록 계산
            const itemDisplay = document.getElementById('itemDisplay');
            let itemTop = itemDisplay.offsetTop;
            let itemLeft = itemDisplay.offsetLeft;
            let itemWidth = itemDisplay.offsetWidth;
            let itemHeight = itemDisplay.offsetHeight;
            
            let dropWidth = 50; 
            let isLeft = Math.random() > 0.5; // 왼쪽 or 오른쪽
            
            let spawnX = isLeft 
                ? itemLeft - dropWidth - (Math.random() * 15)
                : itemLeft + itemWidth + (Math.random() * 15);
                
            // 화면 밖으로 나가지 않도록 보정
            let boxWidth = dropZone.clientWidth;
            spawnX = Math.max(10, Math.min(spawnX, boxWidth - dropWidth - 10));
            
            // Y축은 물건 높이 근처에서 랜덤
            let spawnY = itemTop + (Math.random() * (itemHeight - dropWidth));
            
            el.style.left = spawnX + 'px';
            el.style.top = spawnY + 'px';
            el.innerHTML = `
                ${itemIcons[itemObj.name.replace('[천악] ', '')] || "📦"}
                <div class="buy-tooltip">${itemObj.tier.buyCost.toLocaleString()}원</div>
            `;
            
            let isBought = false;
            let disappearTimer = setTimeout(() => {
                if(!isBought && el.parentNode) {
                    el.remove();
                    pendingDrops = pendingDrops.filter(d => d.id !== dropId);
                }
            }, 5000); 
            
            const handleBuy = function(e) {
                e.stopPropagation();
                e.preventDefault();
                if(isBought) return;
                
                let cost = itemObj.tier.buyCost;
                if(money >= cost) {
                    money -= cost;
                    if(!inventory[itemObj.name]) inventory[itemObj.name] = 0;
                    inventory[itemObj.name]++;
                    isBought = true;
                    
                    el.style.animation = 'none';
                    el.style.transform = 'scale(1.5) translateY(-20px)';
                    el.style.opacity = '0';
                    el.style.transition = 'all 0.3s ease-out';
                    
                    setTimeout(() => el.remove(), 300);
                    
                    pendingDrops = pendingDrops.filter(d => d.id !== dropId);
                    
                    updateUI();
                    saveGame();
                    showSystemMessage(`${itemObj.name} 구매 완료! (+초당 ${itemObj.tier.incomeBase.toLocaleString()}원)`, "#2ecc71");
                } else {
                    showSystemMessage("돈이 부족합니다!", "#e74c3c");
                    el.style.transform = "translateX(-5px)";
                    setTimeout(() => el.style.transform = "translateX(5px)", 50);
                    setTimeout(() => el.style.transform = "translateX(0)", 100);
                }
            };

            el.addEventListener('mousedown', handleBuy);
            el.addEventListener('touchstart', handleBuy, {passive: false});
            
            dropZone.appendChild(el);
        }

        function breakItem() {
            isSpawning = true;
            
            let reward = currentItem.tier.breakReward;
            
            // 피닉스 특성 3배 (전체 보상)
            if (isPhoenixActive) reward *= 3;
            
            // 피닉스 불붙은 상태 파괴 시 +30% 추가 보상
            if (isItemBurning) {
                reward = Math.floor(reward * 1.3);
            }
            
            money += reward;
            
            if (isItemBurning) {
                showSystemMessage(`🔥 불타는 ${currentItem.name} 파괴! +${reward.toLocaleString()}원 (30% 보너스)`, "#e67e22");
            } else if (isLuckEvent && Math.random() < 0.2) {
                let bonus = reward * 2;
                money += bonus;
                showSystemMessage(`🍀 럭키 보너스! +${bonus.toLocaleString()}원 추가 획득!`, "#f1c40f");
            } else {
                showSystemMessage(`${currentItem.name} 파괴! +${reward.toLocaleString()}원`, "#3498db");
            }

            spawnDropElement(currentItem);

            const display = document.getElementById('itemDisplay');
            display.style.transform = "scale(0.3) rotate(180deg)";
            display.style.opacity = "0";
            document.getElementById('hpBar').style.width = "0%";
            document.getElementById('hpText').innerText = `0 / ${maxHp.toLocaleString()}`;
            
            setTimeout(() => {
                updateUI();
                spawnItem();
            }, 400);
        }
        
        function getEquippedCount() {
            let count = 0;
            for (let name in equippedInventory) {
                count += parseInt(equippedInventory[name]) || 0;
            }
            return count;
        }

        function equipItem(name) {
            if (getEquippedCount() >= 6) {
                showSystemMessage("장착 슬롯이 가득 찼습니다! (최대 6개)", "#e74c3c");
                return;
            }
            let equipped = equippedInventory[name] || 0;
            if (equipped < inventory[name]) {
                if (!equippedInventory[name]) equippedInventory[name] = 0;
                equippedInventory[name]++;
                updateUI();
                openInventory();
                saveGame();
            }
        }

        function unequipItem(name) {
            if (equippedInventory[name] && equippedInventory[name] > 0) {
                equippedInventory[name]--;
                updateUI();
                openInventory();
                saveGame();
            }
        }

        function equipBest() {
            equippedInventory = {};
            
            let allOwned = [];
            for (let name in inventory) {
                let count = inventory[name];
                for(let i=0; i<count; i++) {
                    let tier = findTierByItem(name);
                    allOwned.push({ name: name, tierIndex: tiers.indexOf(tier) });
                }
            }
            
            // 티어가 높은 순서대로(배열 인덱스가 큰 순서대로) 정렬
            allOwned.sort((a, b) => b.tierIndex - a.tierIndex);
            
            let top6 = allOwned.slice(0, 6);
            for (let item of top6) {
                if (!equippedInventory[item.name]) equippedInventory[item.name] = 0;
                equippedInventory[item.name]++;
            }
            
            updateUI();
            openInventory();
            saveGame();
            showSystemMessage("✨ 최고 효율의 물건들로 6개 자동 장착 완료!", "#f1c40f");
        }

        function escapeItem() {
            isSpawning = true;
            const display = document.getElementById('itemDisplay');
            display.style.transform = "translateX(100px) rotate(45deg)";
            display.style.opacity = "0";
            
            showSystemMessage("시간 초과! 물건이 도망갔습니다.", "#e74c3c");
            
            setTimeout(() => {
                spawnItem();
            }, 600);
        }

        function openInventory() {
            document.getElementById('inventoryModal').style.display = 'flex';
            let html = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #444; padding-bottom: 10px;">
                    <div style="font-size: 16px; font-weight: bold;">장착 슬롯: <span style="color: #f1c40f;">${getEquippedCount()} / 6</span></div>
                    <button onclick="equipBest()" style="background-color: #f1c40f; border: none; padding: 8px 15px; border-radius: 5px; font-weight: bold; cursor: pointer; color: black; box-shadow: 0 2px 5px rgba(0,0,0,0.5);">✨ 최고 장착하기</button>
                </div>
            `;
            let hasItems = false;
            
            let sortedItems = Object.keys(inventory).sort((a, b) => {
                let tierA = tiers.indexOf(findTierByItem(a));
                let tierB = tiers.indexOf(findTierByItem(b));
                return tierB - tierA; 
            });

            for (let name of sortedItems) {
                if (inventory[name] > 0) {
                    hasItems = true;
                    let tier = findTierByItem(name);
                    let equipped = equippedInventory[name] || 0;
                    let unequipped = inventory[name] - equipped;
                    let income = tier.incomeBase;
                    
                    html += `
                    <div class="list-item" style="border-left-color: ${tier.color}; flex-direction: column; align-items: stretch;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                            <div>
                                <span style="font-size:28px; vertical-align: middle; margin-right: 10px;">${itemIcons[name.replace('[천악] ', '')] || "📦"}</span>
                                <div style="display: inline-block; vertical-align: middle;">
                                    <strong style="font-size:18px;">${name}</strong> <span style="color:${tier.color}; font-size:12px;">[${tier.name}]</span>
                                    <div style="font-size:14px; color:#aaa; margin-top:3px;">보유: ${inventory[name]}개 (개당 초당 +${income.toLocaleString()}원)</div>
                                    <div style="font-size:14px; color:#2ecc71; font-weight: bold; margin-top:3px;">장착 중: ${equipped}개</div>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 10px;">
                            <button style="background-color: #e74c3c; opacity: ${equipped === 0 ? '0.5' : '1'};" onclick="unequipItem('${name}')" ${equipped === 0 ? 'disabled' : ''}>- 해제</button>
                            <button style="background-color: #2ecc71; opacity: ${unequipped === 0 || getEquippedCount() >= 6 ? '0.5' : '1'};" onclick="equipItem('${name}')" ${unequipped === 0 || getEquippedCount() >= 6 ? 'disabled' : ''}>+ 장착</button>
                        </div>
                    </div>`;
                }
            }
            if(!hasItems) html += "<p style='text-align:center;color:#888;padding:20px;'>보유한 물건이 없습니다.<br>화면에 떨어진 물건을 클릭해서 구매해주세요!</p>";
            document.getElementById('inventoryList').innerHTML = html;
        }

        function openShop() {
            document.getElementById('shopModal').style.display = 'flex';
            renderShop();
        }

        function renderShop() {
            let html = '';
            for (let w of weapons) {
                if (w.id === 1) continue; 
                
                // 월드에 따른 상점 무기 필터링
                if (currentWorld === 1 && w.id >= 8) continue; // 1세계: 2세계 무기/풍월도 가림
                if (currentWorld === 2 && w.id < 9) continue;  // 2세계: 1세계 무기/풍월도 가림

                let canBuy = money >= w.cost;
                
                let countStr = "";
                let totalCount = 0;
                if(weaponInventory[w.id]) {
                    for(let s in weaponInventory[w.id]) {
                        totalCount += weaponInventory[w.id][s];
                    }
                }
                if(totalCount > 0) countStr = `<span style="font-size:12px; color:#aaa; margin-left: 5px;">(보유: ${totalCount}개)</span>`;
                
                let btnHtml = canBuy 
                    ? `<button onclick="buyWeapon(${w.id}, ${w.cost})">${w.cost.toLocaleString()}원 구매</button>`
                    : `<button disabled>${w.cost.toLocaleString()}원 구매</button>`;

                html += `
                <div class="list-item">
                    <div style="display: flex; align-items: center;">
                        <span style="font-size:28px; margin-right: 15px;">${w.icon}</span>
                        <div>
                            <strong style="font-size:18px;">${w.name}</strong>${countStr}<br>
                            <span style="font-size:14px; color:#f1c40f;">기본 데미지: +${w.damage.toLocaleString()}</span>
                        </div>
                    </div>
                    ${btnHtml}
                </div>`;
            }
            document.getElementById('shopList').innerHTML = html;
        }

        function buyWeapon(id, cost) {
            if (money >= cost) {
                money -= cost;
                
                if (!weaponInventory[id]) weaponInventory[id] = {};
                if (!weaponInventory[id][0]) weaponInventory[id][0] = 0;
                weaponInventory[id][0]++;
                
                calcClickDamage();
                updateUI();
                renderShop();
                saveGame();
                showSystemMessage(`${weapons.find(w=>w.id===id).name} 구매 완료!`, "#2ecc71");
            }
        }
        
        function getRequiredCountForSynth(star) {
            if (star === 0) return 2;
            if (star === 1) return 2;
            if (star === 2) return 2;
            if (star === 3) return 3;
            if (star === 4) return 4;
            return Infinity; 
        }

        function openSynth() {
            document.getElementById('synthModal').style.display = 'flex';
            renderSynth();
        }

        function renderSynth() {
            let html = '';
            let hasAny = false;
            
            for (let w of weapons) {
                if (w.id === 1) continue; 
                let inv = weaponInventory[w.id];
                if (!inv) continue;
                
                for (let star = 0; star <= 4; star++) { 
                    if (inv[star] > 0) {
                        hasAny = true;
                        let count = inv[star];
                        let req = getRequiredCountForSynth(star);
                        let canSynth = count >= req;
                        let nextDmg = getDmgForStar(w.damage, star + 1);
                        
                        html += `
                        <div class="list-item" style="border-left-color: #8e44ad">
                            <div style="display: flex; align-items: center;">
                                <span style="font-size:28px; margin-right: 15px;">${w.icon}</span>
                                <div>
                                    <strong style="font-size:18px;">${w.name} ${star}성</strong><br>
                                    <span style="font-size:13px; color:#aaa;">보유: <strong style="color: ${canSynth ? '#2ecc71' : '#e74c3c'};">${count}</strong> / ${req}개 필요</span><br>
                                    <span style="font-size:13px; color:#f1c40f;">합성 시 데미지: ${nextDmg.toLocaleString()}</span>
                                </div>
                            </div>
                            <button style="background-color: ${canSynth ? '#8e44ad' : '#555'}; color: ${canSynth ? '#fff' : '#888'};" 
                                ${canSynth ? '' : 'disabled'}
                                onclick="synthesize(${w.id}, ${star})">
                                합성하기!
                            </button>
                        </div>`;
                    }
                }
            }
            
            if(!hasAny) html = "<p style='text-align:center;color:#888;padding:20px;'>합성할 무기가 없습니다.<br>상점에서 무기를 구매해주세요.</p>";
            document.getElementById('synthList').innerHTML = html;
        }

        function synthesize(wId, star) {
            let req = getRequiredCountForSynth(star);
            if (weaponInventory[wId] && weaponInventory[wId][star] >= req) {
                weaponInventory[wId][star] -= req;
                if (!weaponInventory[wId][star + 1]) weaponInventory[wId][star + 1] = 0;
                weaponInventory[wId][star + 1]++;
                
                let wName = weapons.find(w => w.id === parseInt(wId)).name;
                showSystemMessage(`✨합성 성공! [${wName}] ${star+1}성 획득!`, "#8e44ad");
                
                calcClickDamage();
                updateUI();
                renderSynth();
                saveGame();
            }
        }
        
        function showSystemMessage(msg, bgColor) {
            const el = document.createElement('div');
            el.className = 'system-msg';
            el.style.backgroundColor = bgColor || 'rgba(46, 204, 113, 0.9)';
            el.innerText = msg;
            document.body.appendChild(el);
            setTimeout(() => {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 500);
            }, 1500);
        }

        function openUpdatePreview() {
            const now = Date.now();
            const sept4Time = new Date("2026-09-04T16:00:00+09:00").getTime();
            
            if (now >= sept4Time) {
                if(document.getElementById('sept4Preview')) document.getElementById('sept4Preview').style.display = 'none';
                if(document.getElementById('sept5Title')) document.getElementById('sept5Title').style.marginTop = '0px';
            } else {
                if(document.getElementById('sept4Preview')) document.getElementById('sept4Preview').style.display = 'block';
                if(document.getElementById('sept5Title')) document.getElementById('sept5Title').style.marginTop = '35px';
            }
            
            document.getElementById('updateModal').style.display = 'flex';
        }

        function openCodeModal() {
            document.getElementById('codeInputValue').value = '';
            document.getElementById('codeModal').style.display = 'flex';
        }

        function openWorldModal() {
            const w1Btn = document.getElementById('world1Btn');
            const w1Stat = document.getElementById('world1Status');
            const w2Btn = document.getElementById('world2Btn');
            const w2Req = document.getElementById('world2Req');
            const w2Stat = document.getElementById('world2Status');

            // 1세계 UI 업데이트
            if (currentWorld === 1) {
                w1Btn.style.border = "3px solid #2ecc71";
                w1Btn.style.boxShadow = "0 0 10px rgba(46, 204, 113, 0.5)";
                w1Stat.innerText = "(현재 접속 중)";
                w1Stat.style.color = "#fff";
            } else {
                w1Btn.style.border = "3px solid #000";
                w1Btn.style.boxShadow = "none";
                w1Stat.innerText = "이동 가능";
                w1Stat.style.color = "#aaa";
            }

            // 2세계 해금 조건 체크 (4성 플라즈마 캐논 1개 이상 보유)
            const hasPlasma4 = (weaponInventory[7] && weaponInventory[7][4] >= 1);

            if (currentWorld === 2) {
                w2Btn.style.border = "3px solid #2ecc71";
                w2Btn.style.boxShadow = "0 0 10px rgba(46, 204, 113, 0.5)";
                w2Req.style.display = "none";
                w2Stat.innerText = "(현재 접속 중)";
                w2Stat.style.color = "#fff";
                w2Btn.style.opacity = "1";
            } else if (hasPlasma4) {
                w2Btn.style.border = "3px solid #000";
                w2Btn.style.boxShadow = "none";
                w2Req.style.display = "none";
                w2Stat.innerText = "이동 가능 (해금됨!)";
                w2Stat.style.color = "#2ecc71";
                w2Btn.style.opacity = "1";
            } else {
                w2Btn.style.border = "3px dashed #000";
                w2Btn.style.boxShadow = "none";
                w2Req.style.display = "block";
                w2Stat.innerText = "(잠김)";
                w2Stat.style.color = "#aaa";
                w2Btn.style.opacity = "0.8";
            }

            document.getElementById('worldModal').style.display = 'flex';
        }

                function goToWorld(worldId) {
            if (worldId === 3) {
                const divineItems = ["수박"]; // list of divine items
                let divineCount = 0;
                divineItems.forEach(item => {
                    let totalNames = [item, "[천악] " + item];
                    totalNames.forEach(n => {
                        if (inventory[n]) divineCount += inventory[n];
                    });
                });
                
                if (inventory["왁뿌볼"]) divineCount += inventory["왁뿌볼"];
                if (inventory["[천악] 왁뿌볼"]) divineCount += inventory["[천악] 왁뿌볼"];

                if (divineCount < 3) {
                    showSystemMessage("해금 조건을 만족하지 못했습니다. (디바인 아이템 3개 필요)", "#e74c3c");
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
                let hasLevel4Plasma = weaponInventory[7] && weaponInventory[7][4] > 0;
                if (!hasLevel4Plasma) {
                    showSystemMessage("해금 조건을 만족하지 못했습니다.", "#e74c3c");
                    return;
                }
            }

            currentWorld = worldId;
            if (currentWorld === 3) {
                showSystemMessage(`제 천사악마 지역에 입장하셨습니다!`, "#9b59b6");
            } else {
                showSystemMessage(`제 ${worldId}세계로 이동했습니다!`, "#9b59b6");
            }
            saveGame();
            closeModal('worldModal');
            
            document.body.style.transition = "background 1s";
            if (worldId === 3) {
                document.body.style.background = "linear-gradient(90deg, #fdfbfb 0%, #ebedee 30%, #302b63 70%, #0f0c29 100%)";
                document.body.style.color = "#ffffff";
                document.getElementById('btnSynth').style.display = "none";
                document.getElementById('btnUpdate').style.display = "none";
            } else if (worldId === 2) {
                document.body.style.background = "#2c3e50";
                document.body.style.color = "#ecf0f1";
                document.getElementById('btnSynth').style.display = "block";
                document.getElementById('btnUpdate').style.display = "block";
            } else {
                document.body.style.background = "#1a1e28";
                document.body.style.color = "#ffffff";
                document.getElementById('btnSynth').style.display = "block";
                document.getElementById('btnUpdate').style.display = "block";
            }
            
            renderShop();
            if (currentItem) breakItem(true); 
            spawnItem();
        }

                function submitCode() {
            const codeInput = document.getElementById('codeInputValue').value.trim();
            
            if (!codeInput) return;

            if (redeemedCodes.includes(codeInput)) {
                showSystemMessage("이미 사용한 코드입니다!", "#e74c3c");
                return;
            }

            if (codeInput === "20130903") {
                redeemedCodes.push(codeInput);
                if (!inventory["생일 케이크"]) inventory["생일 케이크"] = 0;
                inventory["생일 케이크"]++;
                updateUI();
                saveGame();
                showSystemMessage("비밀 한정판 [생일 케이크] 획득!", "#1abc9c");
                closeModal('codeModal');
            } else if (codeInput === "sorry" || codeInput === "restore_all") {
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
            } else {
                showSystemMessage("유효하지 않은 코드입니다.", "#e74c3c");
            }
        }

        function closeModal(id) {
            document.getElementById(id).style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                event.target.style.display = "none";
            }
        }

        setInterval(() => {
            if (!isSpawning && currentHp > 0) {
                timeLeft -= 0.1;
                if (timeLeft <= 0) {
                    timeLeft = 0;
                    escapeItem();
                } else {
                    updateTimerBar();
                }
            }
        }, 100);

        setInterval(() => {
            saveGame();
        }, 1000);

        setInterval(() => {
            let fps = 0;
            for (let name in equippedInventory) {
                let count = equippedInventory[name];
                let tier = findTierByItem(name);
                fps += count * tier.incomeBase;
            }
            
            if (isPhoenixActive) fps *= 2.5; // 피닉스 특성 시 패시브 수입 2.5배
            else if (isCatActive) fps *= 3;  // 고양이 특성 시 패시브 수입 3배
            
            if(fps > 0) {
                money += fps;
                updateUI();
            }
        }, 1000);

        // 9월 4일 금요일 4시 자동 업데이트 타이머
        setInterval(() => {
            const updateTime = new Date("2026-09-04T16:00:00+09:00").getTime();
            if (Date.now() >= updateTime && !window.updateApplied) {
                window.updateApplied = true;
                
                // 유니크 아이템 추가
                let uniqueTier = tiers.find(t => t.name === "유니크");
                if (uniqueTier && !uniqueTier.items.includes("대장장이의 망치")) {
                    uniqueTier.items.push("대장장이의 망치");
                    itemIcons["대장장이의 망치"] = "🔨";
                }
                
                // 무기 상점 추가
                if (!weapons.find(w => w.name === "풍월도")) {
                    weapons.push({ id: 8, name: "풍월도", cost: 10000000, damage: 150000, icon: "🌙" });
                    
                    // 켜져 있는 상점 모달이 있다면 바로 업데이트
                    if (document.getElementById('shopModal').style.display === 'flex') renderShop();
                    if (document.getElementById('synthModal').style.display === 'flex') renderSynth();
                }
                
                showSystemMessage("🎉 대규모 업데이트! 망치, 풍월도, 그리고 고양이 특성이 펑크 노래와 함께 추가되었습니다!", "#f1c40f");
            }
        }, 1000);

        let isLoaded = loadGame();
        if (!isLoaded) {
            spawnItem();
            calcClickDamage();
        }
        
        try {
            if (!localStorage.getItem('welcomeBonusPaid')) {
                money += 100;
                localStorage.setItem('welcomeBonusPaid', 'true');
                saveGame();
                setTimeout(() => {
                    showSystemMessage("🎉 첫 접속 보너스! 100원이 지급되었습니다!", "#f1c40f");
                }, 1000);
            }
        } catch(e) {}

        updateUI();

    
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
            document.getElementById('itemTier').innerText = `[${selectedTier.name}]`;
            document.getElementById('itemTier').style.color = selectedTier.color;
            
            display.style.boxShadow = `inset 0 0 25px ${selectedTier.color}40, 0 0 15px ${selectedTier.color}60`;
            display.style.border = `2px solid ${selectedTier.color}`;
            display.style.transform = "none";
            display.style.opacity = "1";
            display.classList.remove('item-burning');
            
            updateHpBar();
            updateTimerBar();
            
            isSpawning = false;
        }
    

        function updateHpBar() {
            let pct = (currentHp / maxHp) * 100;
            if(pct < 0) pct = 0;
            document.getElementById('hpBar').style.width = pct + "%";
            document.getElementById('hpText').innerText = `${Math.ceil(currentHp).toLocaleString()} / ${maxHp.toLocaleString()}`;
        }
        
        function updateTimerBar() {
            let pct = (timeLeft / currentMaxTime) * 100;
            if(pct < 0) pct = 0;
            const timerBar = document.getElementById('timerBar');
            timerBar.style.width = pct + "%";
            document.getElementById('timerText').innerText = timeLeft.toFixed(1) + "s";
            
            if (pct < 25) {
                timerBar.style.backgroundColor = "#e74c3c"; 
            } else if (pct < 50) {
                timerBar.style.backgroundColor = "#f1c40f"; 
            } else {
                timerBar.style.backgroundColor = "#3498db"; 
            }
        }

        function updateUI() {
            document.getElementById('money').innerText = Math.floor(money).toLocaleString();
        }

        function findTierByItem(itemName) {
            let baseName = itemName.replace('[천악] ', '');
            for (let t of tiers) {
                if (t.items.includes(baseName)) return t;
            }
            return tiers[0];
        }


    weaponInventory = { 1: {0: 1} };
    inventory = { '아령': 5, '차': 2 };
    equippedInventory = { '아령': 1, '차': 1 };
    
    try {
        currentWorld = 1;
        
        console.log('Before code: money =', money);
        
        // Execute the code function directly
        submitCode();
        
        console.log('After code: money =', money);
        console.log('inventory:', inventory);
        
        // Run any timeouts
        spawnItem();
        console.log('After spawnItem: currentItem =', currentItem.name);
        
    } catch(e) {
        console.log('Error:', e.stack);
    }
