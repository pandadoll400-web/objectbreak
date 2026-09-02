const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// fix findTierByItem
const findTierRegex = /function findTierByItem\(itemName\) \{[\s\S]*?return tiers\[0\];\s*\}/m;
const findTierNew = `function findTierByItem(itemName) {
            let baseName = itemName.replace('[천악] ', '');
            for (let t of tiers) {
                if (t.items.includes(baseName)) return t;
            }
            return tiers[0];
        }`;
code = code.replace(findTierRegex, findTierNew);

// fix itemIcons template literals in html chunks
code = code.replace(/\$\{itemIcons\[itemObj\.name\] \|\| "\?"\}/g, '${itemIcons[itemObj.name.replace(\'[천악] \', \'\')] || "📦"}');
code = code.replace(/\$\{itemIcons\[itemObj\.name\] \|\| "📦"\}/g, '${itemIcons[itemObj.name.replace(\'[천악] \', \'\')] || "📦"}');
code = code.replace(/\$\{itemIcons\[name\] \|\| "\?"\}/g, '${itemIcons[name.replace(\'[천악] \', \'\')] || "📦"}');
code = code.replace(/\$\{itemIcons\[name\] \|\| "📦"\}/g, '${itemIcons[name.replace(\'[천악] \', \'\')] || "📦"}');

fs.writeFileSync('index.html', code);
console.log('Fixed icons');
