const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
let jsMatch = code.match(/<script>([\s\S]*?)<\/script>/);
let js = jsMatch[1];

let mockEnv = `
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
`;

let script = mockEnv + js + `
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
`;
fs.writeFileSync('test_cheatcode.js', script);
