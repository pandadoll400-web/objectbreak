const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const correctGoToWorld = `        function goToWorld(worldId) {
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
                showSystemMessage(\`제 천사악마 지역에 입장하셨습니다!\`, "#9b59b6");
            } else {
                showSystemMessage(\`제 \${worldId}세계로 이동했습니다!\`, "#9b59b6");
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
        }`;

code = code.replace(/function goToWorld\(worldId\) \{[\s\S]*?spawnItem\(\);\s*\}/m, correctGoToWorld);

const correctSubmitCode = `        function submitCode() {
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
            } else if (codeInput === "sorry") {
                redeemedCodes.push(codeInput);
                money += 500000000000;
                if (!inventory["수박"]) inventory["수박"] = 0;
                inventory["수박"] += 3;
                if (!weaponInventory[7]) weaponInventory[7] = {4: 1};
                else weaponInventory[7][4] = 1;
                calcClickDamage();
                updateUI();
                saveGame();
                showSystemMessage("복구 완료! (수박 3개, 5000억 획득)", "#1abc9c");
                closeModal('codeModal');
            } else {
                showSystemMessage("유효하지 않은 코드입니다.", "#e74c3c");
            }
        }`;

code = code.replace(/function submitCode\(\) \{[\s\S]*?showSystemMessage\(".*?", "#e74c3c"\);\s*\}\s*\}/m, correctSubmitCode);

fs.writeFileSync('index.html', code);
console.log('Fixed goToWorld and submitCode');
