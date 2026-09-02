const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /function applyWorldTheme\(worldId\) \{[\s\S]*?spawnItem\(\);\n        \}/;

const newCode = `function applyWorldTheme(worldId) {
            document.body.style.transition = "background 1s";
            let btnSynth = document.getElementById('btnSynth');
            let btnUpdate = document.getElementById('btnUpdate');
            
            if (worldId === 3) {
                document.body.style.background = "linear-gradient(90deg, #fdfbfb 0%, #dcdde1 49.9%, #8e44ad 50%, #2c3e50 100%)";
                document.body.style.color = "#ffffff";
                if(btnSynth) btnSynth.style.display = "none";
                if(btnUpdate) btnUpdate.style.display = "none";
            } else if (worldId === 2) {
                document.body.style.background = "#2c3e50";
                document.body.style.color = "#ecf0f1";
                if(btnSynth) btnSynth.style.display = "block";
                if(btnUpdate) btnUpdate.style.display = "block";
            } else {
                document.body.style.background = "#1a1e28";
                document.body.style.color = "#ffffff";
                if(btnSynth) btnSynth.style.display = "block";
                if(btnUpdate) btnUpdate.style.display = "block";
            }
        }

        function goToWorld(worldId) {
            if (worldId === 3) {
                const divineItems = ["수박"]; 
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
                showSystemMessage(\`제 천사악마 지역에 입장하셨습니다!\`, "#9b59b6");
            } else {
                showSystemMessage(\`제 \${worldId}세계로 이동했습니다!\`, "#9b59b6");
            }
            saveGame();
            closeModal('worldModal');
            
            applyWorldTheme(worldId);
            
            renderShop();
            if (currentItem) breakItem(true); 
            spawnItem();
        }`;

code = code.replace(regex, newCode);
fs.writeFileSync('index.html', code);
console.log('Restored applyWorldTheme and goToWorld');
