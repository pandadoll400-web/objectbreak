const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');
let jsMatch = code.match(/<script>([\s\S]*?)<\/script>/);
let js = jsMatch[1];

let mockEnv = `
    let document = {
        getElementById: () => ({ style: {}, innerText: '', classList: { remove: () => {} } }),
        body: { appendChild: () => {}, style: {} },
        createElement: () => ({ style: {}, innerText: '', classList: { remove: () => {} } })
    };
    let window = { serverEventData: {}, onclick: () => {} };
    let location = { reload: () => {} };
    let localStorage = { getItem: () => null, setItem: () => {} };
    // let setInterval = () => {};
    // let setTimeout = () => {};
`;

let script = mockEnv + js + `
    weaponInventory = { 7: { 4: 1 } };
    inventory = { '지우개': 5 };
    equippedInventory = { '지우개': 1 };
    
    try {
        calcClickDamage();
        console.log('clickDamage is:', clickDamage);
        openInventory();
        console.log('openInventory success');
    } catch(e) {
        console.log('Error:', e.stack);
    }
`;
fs.writeFileSync('test_dryrun.js', script);
