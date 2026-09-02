const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
let jsMatch = code.match(/<script>([\s\S]*?)<\/script>/);
let js = jsMatch[1];

let mockEnv = `
    let document = {
        getElementById: () => ({ style: {}, innerText: '', classList: { remove: () => {} }, offsetTop: 0 }),
        body: { appendChild: () => {}, style: {} },
        createElement: () => ({ style: {}, innerText: '', classList: { add: () => {}, remove: () => {} } })
    };
    let window = { serverEventData: {}, onclick: () => {} };
    let location = { reload: () => {} };
    let localStorage = { getItem: () => null, setItem: () => {} };
`;

let script = mockEnv + js + `
    weaponInventory = { 7: { 4: 1 } };
    inventory = { '지우개': 5, '덤벨': 2 };
    equippedInventory = { '지우개': 1, '덤벨': 1 };
    
    try {
        currentWorld = 1;
        calcClickDamage();
        console.log('clickDamage is:', clickDamage);
        
        spawnItem();
        console.log('spawnItem success! currentItem:', currentItem.name);
        
        breakItem();
        console.log('breakItem executed');
        
        // Mock setTimeout
        updateUI();
        spawnItem();
        console.log('spawnItem after break success! currentItem:', currentItem.name);
        
    } catch(e) {
        console.log('Error:', e.stack);
    }
`;
fs.writeFileSync('test_dryrun_break.js', script);
