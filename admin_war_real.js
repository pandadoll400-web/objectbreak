// [실시간 글로벌 라이브 이벤트] 그레이스 폭주 (9월 4일 오후 4시 정각 전용)
// 이 스크립트를 Vercel에 올리면, 유저의 접속 시간(시/분/초)에 따라 이벤트 상황이 완벽하게 동기화됩니다!

(function() {
    // ⏰ 라이브 이벤트 시작 시간 (2026년 9월 4일 오후 4시 정각)
    const EVENT_START = new Date("2026-09-04T16:00:00+09:00").getTime();
    const NOW = Date.now();
    const ELAPSED = NOW - EVENT_START;
    
    // 아직 이벤트 시작 전이거나, 15분(900,000ms)이 지나서 완전히 끝났으면 아무것도 안 함
    if (ELAPSED < 0 || ELAPSED > 900000) {
        window.serverEventData = { active: false, endTime: 0, multiplier: 1, trait: null };
        if (typeof stopPhoenixMode === 'function') stopPhoenixMode();
        if (typeof stopCatMode === 'function') stopCatMode();
        return;
    }

    if (!window.liveEventState) window.liveEventState = {};

    // 🎯 1회성 멘트나 액션을 트리거하는 함수 
    // (지정된 시간 + 10초 이내에 접속해 있을 때만 발동! 늦게 온 사람은 아예 못 봄)
    function triggerOnce(key, targetTime, action) {
        if (ELAPSED >= targetTime && !window.liveEventState[key]) {
            window.liveEventState[key] = true;
            if (ELAPSED <= targetTime + 10000) { // 딱 10초의 유예기간 내에 있던 사람만!
                action();
            }
        }
    }

    // 화면 중앙에 텍스트 띄우는 함수 (3초 유지)
    function showCenterText(text) {
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.top = '30%';
        el.style.left = '50%';
        el.style.transform = 'translate(-50%, -50%)';
        el.style.fontSize = '35px';
        el.style.fontWeight = 'bold';
        el.style.color = '#fff';
        el.style.textShadow = '0 0 10px #000, 0 0 20px #e74c3c';
        el.style.zIndex = '9999999';
        el.style.textAlign = 'center';
        el.style.whiteSpace = 'pre-line';
        el.style.pointerEvents = 'none';
        el.innerHTML = text;
        document.body.appendChild(el);
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.5s';
            setTimeout(() => el.remove(), 500);
        }, 3000);
    }

    // === [🎬 실시간 타임라인 대본] ===

    // 0분: "Hello everyone!"
    triggerOnce("msg1", 0, () => showCenterText("그레이스: Hello everyone!\n그레이스: It's my first admim abuse"));
    // 0분 3초: "First 4x luck!"
    triggerOnce("msg2", 3000, () => showCenterText("그레이스: First 4x luck!"));
    
    // 5분 4초 (304000ms): "ohh enjoying pheonix ,cat"
    triggerOnce("msg3", 304000, () => showCenterText("그레이스: ohh enjoying pheonix ,cat"));

    // 10분 4초 (604000ms): "6x luck?"
    triggerOnce("msg4", 604000, () => showCenterText("그레이스: 6x luck?"));

    // 12분 4초 (724000ms): 시크릿 아이템 드랍! (이때 없던 놈은 영영 못 먹음)
    triggerOnce("msg5", 724000, () => {
        showCenterText("그레이스: I spawn a secret in all sever");
        try {
            const secretTier = tiers.find(t => t.name === "비밀" || t.name === "시크릿") || tiers[tiers.length - 1];
            const secretItemName = secretTier.items[Math.floor(Math.random() * secretTier.items.length)];
            
            const drop = document.createElement('div');
            drop.className = 'drop-item';
            drop.style.borderColor = secretTier.color || "#000";
            drop.innerText = itemIcons[secretItemName] || "📦";
            
            const display = document.getElementById('itemDisplay');
            drop.style.left = (display.offsetLeft + 50) + 'px';
            drop.style.top = (display.offsetTop + 50) + 'px';
            drop.style.zIndex = '99999';
            
            drop.onclick = () => {
                if (!inventory[secretItemName]) inventory[secretItemName] = 0;
                inventory[secretItemName]++;
                if (typeof updateUI === 'function') updateUI();
                if (typeof saveGame === 'function') saveGame();
                if (typeof showSystemMessage === 'function') showSystemMessage(`✨ 그레이스의 선물: 시크릿 [${secretItemName}] 획득!`, secretTier.color || "#000");
                drop.remove();
            };
            document.body.appendChild(drop);
        } catch(e) {}
    });

    // 12분 8초 (728000ms): 투표창 등장 
    triggerOnce("vote_ui", 728000, () => {
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
            
            voteBox.innerHTML = `
                <h2 style="margin-top:0; color:#f1c40f;">오늘 업데이트 재미있었나요?</h2>
                <div style="display:flex; justify-content:center; gap:30px; margin-top:20px;">
                    <button id="voteW" style="padding:15px 40px; font-size:24px; background:#2ecc71; border:none; border-radius:10px; color:white; cursor:pointer; font-weight:bold; transition:0.3s;">W <span id="countW">0</span></button>
                    <button id="voteL" style="padding:15px 40px; font-size:24px; background:#e74c3c; border:none; border-radius:10px; color:white; cursor:pointer; font-weight:bold; transition:0.3s;">L <span id="countL">0</span></button>
                </div>
            `;
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
        }, 4000);
    });

    // 12분 22초 (742000ms): WOW amazing
    triggerOnce("msg6", 742000, () => showCenterText("그레이스: WOW amazing"));
    // 12분 25.5초 (745500ms): forge do best in next time
    triggerOnce("msg7", 745500, () => showCenterText("그레이스: forge do best in next time"));
    // 12분 29초 (749000ms): forge fool haha
    triggerOnce("msg8", 749000, () => showCenterText("그레이스: forge fool haha"));
    // 12분 33초 (753000ms): 투표창 철거 및 엔딩
    triggerOnce("msg9", 753000, () => {
        const vBox = document.getElementById('graceVoteBox');
        if (vBox) vBox.remove();
        if (window.fakeVoteInterval) clearInterval(window.fakeVoteInterval);
        showCenterText("-update is the end-");
    });

    // === [🔥 중간 난입자 버프 실시간 강제 동기화] ===
    const is4xLuck = ELAPSED >= 4000 && ELAPSED < 424000;       // 0분4초 ~ 7분4초
    const is6xLuck = ELAPSED >= 604000 && ELAPSED < 844000;     // 10분4초 ~ 14분4초
    const isTraitActive = ELAPSED >= 304000 && ELAPSED < 724000;// 5분4초 ~ 12분4초

    // 1. 특성 강제 동기화 (중간에 온 유저도 즉시 특성이 켜짐)
    if (isTraitActive) {
        if (typeof startPhoenixMode === 'function' && !isPhoenixActive) startPhoenixMode();
        if (typeof startCatMode === 'function' && !isCatActive) startCatMode();
    } else {
        if (typeof stopPhoenixMode === 'function' && isPhoenixActive) stopPhoenixMode();
        if (typeof stopCatMode === 'function' && isCatActive) stopCatMode();
    }

    // 2. 럭키 이벤트 글로벌 세팅
    if (is6xLuck) {
        window.serverEventData = { active: true, endTime: EVENT_START + 844000, multiplier: 6, trait: (isTraitActive ? 'both' : null) };
    } else if (is4xLuck) {
        window.serverEventData = { active: true, endTime: EVENT_START + 424000, multiplier: 4, trait: (isTraitActive ? 'both' : null) };
    } else {
        if (isTraitActive) {
            window.serverEventData = { active: true, endTime: EVENT_START + 724000, multiplier: 1, trait: 'both' };
        } else {
            window.serverEventData = { active: false, endTime: 0, multiplier: 1, trait: null };
        }
    }
    
    // 특성 UI 디자인 동기화
    if (isTraitActive) {
        const luckUI = document.getElementById('luckEventUI');
        if (luckUI) {
            luckUI.style.display = 'block';
            luckUI.style.background = 'linear-gradient(45deg, #e74c3c, #9b59b6)';
            luckUI.classList.remove('phoenix-ui');
            document.getElementById('luckIcon').innerText = '🦅🐱';
            document.getElementById('luckTitle').innerText = '피닉스 & 고양이!';
            document.getElementById('luckTitle').style.color = '#fff';
            document.getElementById('luckSub').innerText = '초토화 모드!';
        }
    }
})();
