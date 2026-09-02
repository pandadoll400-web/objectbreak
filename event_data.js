(function() {
    // 자동 패치 코드 (1회 새로고침 후 무한 반복 방지)
    if (!sessionStorage.getItem('auto_update_hotfix_dialogue')) {
        sessionStorage.setItem('auto_update_hotfix_dialogue', 'true');
        location.reload();
        return;
    }
    
    
    // 두번째 라이브 이벤트 강제 트리거 (가운데 시스템 메시지)
    if (!sessionStorage.getItem('grace_hello_live_2')) {
        sessionStorage.setItem('grace_hello_live_2', 'true');
        if (typeof showSystemMessage === 'function') {
            showSystemMessage('hello', '#f39c12');
        }
    }

    // 라이브 이벤트 강제 트리거!
    if (!sessionStorage.getItem('grace_hello_live_1')) {
        sessionStorage.setItem('grace_hello_live_1', 'true');
        if (typeof showGraceDialogue === 'function') {
            showGraceDialogue("hello", 3000);
        }
    }

    if (!sessionStorage.getItem('auto_update_grace_event')) {
        sessionStorage.setItem('auto_update_grace_event', 'true');
        location.reload();
        return;
    }

    // ★ 실제 9월 4일 업데이트 시작 시간 (한국시간 기준 오후 4시 정각)
    const EVENT_START = new Date("2026-09-04T16:00:00+09:00").getTime();
    const ELAPSED = Date.now() - EVENT_START;

    if (!window.graceShownMsgs) window.graceShownMsgs = {};
    
    // 특정 시간에 메시지나 이벤트를 1번만 실행 (오차 4초 이내)
    function triggerOnce(id, targetTime, callback) {
        if (ELAPSED >= targetTime && ELAPSED < targetTime + 4000 && !window.graceShownMsgs[id]) {
            window.graceShownMsgs[id] = true;
            callback();
        }
    }

    // 흰색 텍스트 렌더링 함수 (모바일에서도 안 잘리게 너비 조정)
    function showCenterText(text) {
        const msg = document.createElement('div');
        msg.style.position = 'fixed';
        msg.style.top = '20%';
        msg.style.left = '50%';
        msg.style.transform = 'translate(-50%, -50%)';
        msg.style.color = 'white'; // 유저 요청: 흰색
        msg.style.fontSize = '28px'; // 폰트 크기 모바일 호환성
        msg.style.fontWeight = 'bold';
        msg.style.width = '90%';
        msg.style.textAlign = 'center';
        msg.style.zIndex = '999999';
        msg.style.textShadow = '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000';
        msg.innerText = text;
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 4000);
    }

    // 0분 4초
    triggerOnce("msg1", 4000, () => showCenterText("그레이스: welcome to update I'll give 4x luck"));
    
    // 5분 4초
    triggerOnce("msg2", 304000, () => showCenterText("그레이스: oops wait I'm making a bug maybe trait"));
    
    // 10분 4초
    triggerOnce("msg3", 604000, () => showCenterText("그레이스: omg bug what is 6x lucky?"));
    
    // 11분 4초
    triggerOnce("msg4", 664000, () => showCenterText("그레이스: I can't stop this"));
    
    // 12분 4초: 시크릿 확정 드랍
    triggerOnce("msg5", 724000, () => {
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

    // 12분 8초: 투표창 등장 (핸드폰 호환되게 폭 조절)
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
            voteBox.style.padding = '20px'; // 패딩 축소
            voteBox.style.width = '90%'; // 모바일 호환성
            voteBox.style.maxWidth = '350px'; // 최대 폭 제한
            voteBox.style.boxSizing = 'border-box'; // 패딩 삐져나가지 않게
            voteBox.style.zIndex = '9999999';
            voteBox.style.textAlign = 'center';
            voteBox.style.color = '#fff';
            voteBox.style.boxShadow = '0 0 30px #000';
            
            voteBox.innerHTML = `
                <h3 style="margin-top:0; color:#f1c40f; font-size:18px;">오늘 업데이트 어땠어요?</h3>
                <div style="display:flex; justify-content:center; gap:20px; margin-top:15px;">
                    <button id="voteW" style="padding:10px 30px; font-size:20px; background:#2ecc71; border:none; border-radius:10px; color:white; cursor:pointer; font-weight:bold; transition:0.3s; flex:1;">W <br><span id="countW">0</span></button>
                    <button id="voteL" style="padding:10px 30px; font-size:20px; background:#e74c3c; border:none; border-radius:10px; color:white; cursor:pointer; font-weight:bold; transition:0.3s; flex:1;">L <br><span id="countL">0</span></button>
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

    // 12분 22초
    triggerOnce("msg6", 742000, () => showCenterText("그레이스: WOW amazing"));
    // 12분 25초
    triggerOnce("msg7", 745500, () => showCenterText("그레이스: forge do best in next time"));
    // 12분 29초
    triggerOnce("msg8", 749000, () => showCenterText("그레이스: forge fool haha"));
    
    // 12분 33초: 이벤트 종료
    triggerOnce("msg9", 753000, () => {
        const vBox = document.getElementById('graceVoteBox');
        if (vBox) vBox.remove();
        if (window.fakeVoteInterval) clearInterval(window.fakeVoteInterval);
        showCenterText("-update is the end-");
    });

    // ★ 14분 4초에 완전히 끝나는 시스템 유지 시간 설정
    const is4xLuck = ELAPSED >= 4000 && ELAPSED < 424000;       // 0분4초 ~ 7분4초
    const is6xLuck = ELAPSED >= 604000 && ELAPSED < 844000;     // 10분4초 ~ 14분4초 (14분짜리 이벤트!)
    const isTraitActive = ELAPSED >= 304000 && ELAPSED < 724000;// 5분4초 ~ 12분4초

    if (isTraitActive) {
        if (typeof startPhoenixMode === 'function' && !isPhoenixActive) startPhoenixMode();
        if (typeof startCatMode === 'function' && !isCatActive) startCatMode();
    } else {
        if (typeof stopPhoenixMode === 'function' && isPhoenixActive) stopPhoenixMode();
        if (typeof stopCatMode === 'function' && isCatActive) stopCatMode();
    }

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
})();
