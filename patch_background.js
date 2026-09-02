const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// Create applyWorldTheme function
const applyWorldTheme = `
        function applyWorldTheme(worldId) {
            document.body.style.transition = "background 1s";
            let btnSynth = document.getElementById('btnSynth');
            let btnUpdate = document.getElementById('btnUpdate');
            
            if (worldId === 3) {
                // 천사 악마 뚜렷한 반반 배경
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
`;

// Insert it before goToWorld
code = code.replace('function goToWorld(worldId) {', applyWorldTheme + '\n        function goToWorld(worldId) {');

// Replace logic in goToWorld
const goToWorldBgRegex = /document\.body\.style\.transition = "background 1s";[\s\S]*?document\.getElementById\('btnUpdate'\)\.style\.display = "block";\n            \}/;
code = code.replace(goToWorldBgRegex, 'applyWorldTheme(worldId);');

// Apply it after loadGame
const loadGameRegex = /let isLoaded = loadGame\(\);\n\s*if \(!isLoaded\) \{/;
code = code.replace(loadGameRegex, `let isLoaded = loadGame();
        applyWorldTheme(currentWorld);
        if (!isLoaded) {`);

fs.writeFileSync('index.html', code);
console.log('Background theme logic updated');
