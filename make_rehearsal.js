const fs = require('fs');
const content = `(function() {
    if (!sessionStorage.getItem('auto_update_v2')) {
        sessionStorage.setItem('auto_update_v2', 'true');
        location.reload();
        return;
    }

    window.REHEARSAL_START = window.REHEARSAL_START || Date.now();
    const EVENT_START = window.REHEARSAL_START;
    const ELAPSED = Date.now() - EVENT_START;

    if (!window.graceShownMsgs) window.graceShownMsgs = {};
    
    function triggerOnce(id, targetTime, callback) {
        if (ELAPSED >= targetTime && ELAPSED < targetTime + 4000 && !window.graceShownMsgs[id]) {
            window.graceShownMsgs[id] = true;
            callback();
        }
    }

    function showCenterText(text) {
        const msg = document.createElement('div');
        msg.style.position = 'fixed';
        msg.style.top = '20%';
        msg.style.left = '50%';
        msg.style.transform = 'translate(-50%, -50%)';
        msg.style.color = 'red';
        msg.style.fontSize = '40px';
        msg.style.fontWeight = 'bold';
        msg.style.zIndex = '999999';
        msg.style.textShadow = '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000';
        msg.innerText = text;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }

    triggerOnce("msg1", 3000, () => showCenterText("그레이스: welcome to update I'll give 4x luck"));
    triggerOnce("msg2", 8000, () => showCenterText("그레이스: oops wait I'm making a bug maybe trait"));
    triggerOnce("msg3", 13000, () => showCenterText("그레이스: omg bug what is 6x lucky?"));
    triggerOnce("msg4", 18000, () => showCenterText("그레이스: I can't stop this"));
    
    triggerOnce("msg5", 23000, () => {
        showCenterText("그레이스: I spawn a secret in all sever");
        try {
            const secretTier = tiers.find(t => t.name === "비밀" || t.name === "시크릿") || tiers[tiers.length - 1];
            const secretItemName = secretTier.items[Math.floor(Math.random() * secretTier.items.length)];
            
            const drop = document.createElement('div');
            drop.className = 'drop-item';
            drop.style.borderColor = secretTier.color || "#000";
            drop.innerText = itemIcons[secretItemName] || "🎁";
            
            const display = document.getElementById('itemDisplay');
            drop.style.left = (display.offsetLeft + 50) + 'px';
            drop.style.top = (display.offsetTop + 50) + 'px';
            drop.style.zIndex = '99999';
            
            drop.onclick = () => {
                if (!inventory[secretItemName]) inventory[secretItemName] = 0;
                inventory[secretItemName]++;
                if (typeof updateUI === 'function') updateUI();
                if (typeof saveGame === 'function') saveGame();
                if (typeof showSystemMessage === 'function') showSystemMessage("✨그레이스의 선물: 시크릿 [" + secretItemName + "] 획득!", secretTier.color || "#000");
                drop.remove();
            };
            document.body.appendChild(drop);
        } catch(e) {}
    });

    triggerOnce("vote_ui", 27000, () => {
        showCenterText("그레이스: Next update........");
        setTimeout(() => {
            const voteBox = document.createElement('div');
            voteBox.id = 'graceVoteBox';
            voteBox.style.position = 'fixed';
            voteBox.style.top = '45%';
            voteBox.style.left = '50%';
            voteBox.style.transform = 'translate(-50%, -50%)';
            voteBox.style.background = 'rgba(44, 62, 80, 0.95)';
            voteBox.style.border = '3px solid #34495e';
            voteBox.style.borderRadius = '15px';
            voteBox.style.padding = '30px';
            voteBox.style.zIndex = '9999999';
            voteBox.style.textAlign = 'center';
            voteBox.style.color = '#fff';
            voteBox.style.boxShadow = '0 0 30px #000';
            
            voteBox.innerHTML = "<h2 style=\\"margin-top:0; color:#f1c40f;\\">오늘 업데이트 어땠어요?</h2>" +
                "<div style=\\"display:flex; justify-content:center; gap:30px; margin-top:20px;\\">" +
                    "<button id=\\"voteW\\" style=\\"padding:15px 40px; font-size:24px; background:#2ecc71; border:none; border-radius:10px; color:white; cursor:pointer; font-weight:bold; transition:0.3s;\\">W <span id=\\"countW\\">0</span></button>" +
                    "<button id=\\"voteL\\" style=\\"padding:15px 40px; font-size:24px; background:#e74c3c; border:none; border-radius:10px; color:white; cursor:pointer; font-weight:bold; transition:0.3s;\\">L <span id=\\"countL\\">0</span></button>" +
                "</div>";
            document.body.appendChild(voteBox);
            
            let wCount = 0; let lCount = 0; let hasVoted = false;
            
            document.getElementById('voteW').onclick = () => {
                if (hasVoted) return; hasVoted = true; wCount++;
                document.getElementById('countW').innerText = wCount;
                document.getElementById('voteW').style.opacity = '0.5'; document.getElementById('voteW').style.cursor = 'not-allowed';
                document.getElementById('voteL').style.opacity = '0.5'; document.getElementById('voteL').style.cursor = 'not-allowed';
            };
            document.getElementById('voteL').onclick = () => {
                if (hasVoted) return; hasVoted = true; lCount++;
                document.getElementById('countL').innerText = lCount;
                document.getElementById('voteW').style.opacity = '0.5'; document.getElementById('voteW').style.cursor = 'not-allowed';
                document.getElementById('voteL').style.opacity = '0.5'; document.getElementById('voteL').style.cursor = 'not-allowed';
            };
            
            let fakeVotes = [];
            for (let i = 0; i < 25; i++) fakeVotes.push('W');
            for (let i = 0; i < 5; i++) fakeVotes.push('L');
            fakeVotes.sort(() => Math.random() - 0.5); 
            
            setTimeout(() => {
                window.fakeVoteInterval = setInterval(() => {
                    if (fakeVotes.length > 0) {
                        let vote = fakeVotes.pop();
                        if (vote === 'W') { wCount++; document.getElementById('countW').innerText = wCount; } 
                        else { lCount++; document.getElementById('countL').innerText = lCount; }
                    } else {
                        clearInterval(window.fakeVoteInterval);
                    }
                }, 300); 
            }, 500);
        }, 3000);
    });

    triggerOnce("msg6", 34000, () => showCenterText("그레이스: WOW amazing"));
    triggerOnce("msg7", 36000, () => showCenterText("그레이스: forge do best in next time"));
    triggerOnce("msg8", 38000, () => showCenterText("그레이스: forge fool haha"));
    triggerOnce("msg9", 40000, () => {
        const vBox = document.getElementById('graceVoteBox');
        if (vBox) vBox.remove();
        if (window.fakeVoteInterval) clearInterval(window.fakeVoteInterval);
        showCenterText("-update is the end-");
        delete window.REHEARSAL_START; 
        sessionStorage.removeItem('auto_update_v2'); 
    });

    const is4xLuck = ELAPSED >= 3000 && ELAPSED < 13000;
    const is6xLuck = ELAPSED >= 13000 && ELAPSED < 40000;
    const isTraitActive = ELAPSED >= 8000 && ELAPSED < 23000;

    if (isTraitActive) {
        if (typeof startPhoenixMode === 'function' && !isPhoenixActive) startPhoenixMode();
        if (typeof startCatMode === 'function' && !isCatActive) startCatMode();
    } else {
        if (typeof stopPhoenixMode === 'function' && isPhoenixActive) stopPhoenixMode();
        if (typeof stopCatMode === 'function' && isCatActive) stopCatMode();
    }

    if (is6xLuck) {
        window.serverEventData = { active: true, endTime: EVENT_START + 40000, multiplier: 6, trait: (isTraitActive ? 'both' : null) };
    } else if (is4xLuck) {
        window.serverEventData = { active: true, endTime: EVENT_START + 13000, multiplier: 4, trait: (isTraitActive ? 'both' : null) };
    } else {
        if (isTraitActive) {
            window.serverEventData = { active: true, endTime: EVENT_START + 23000, multiplier: 1, trait: 'both' };
        } else {
            window.serverEventData = { active: false, endTime: 0, multiplier: 1, trait: null };
        }
    }
    
    if (isTraitActive) {
        const luckUI = document.getElementById('luckEventUI');
        if (luckUI) {
            luckUI.style.display = 'block';
            luckUI.style.background = 'linear-gradient(45deg, #e74c3c, #9b59b6)';
            luckUI.classList.remove('phoenix-ui');
            document.getElementById('luckIcon').innerText = '🔥🐱';
            document.getElementById('luckTitle').innerText = '피닉스 & 고양이';
            document.getElementById('luckTitle').style.color = '#fff';
            document.getElementById('luckSub').innerText = '초토화 모드!';
        }
    }
})();\`;

fs.writeFileSync('event_data.js', content, 'utf8');
