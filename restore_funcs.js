const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const missingFuncs = `
        function updateHpBar() {
            let pct = (currentHp / maxHp) * 100;
            if(pct < 0) pct = 0;
            document.getElementById('hpBar').style.width = pct + "%";
            document.getElementById('hpText').innerText = \`\${Math.ceil(currentHp).toLocaleString()} / \${maxHp.toLocaleString()}\`;
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
`;

// Insert them right before </script>
code = code.replace(/<\/script>/, missingFuncs + '\n</script>');

fs.writeFileSync('index.html', code);
console.log('Restored missing functions');
