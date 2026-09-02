const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const fixRegex = /if \(typeof state\.isLuckEvent === 'boolean'\) isLuckEvent = state\.isLuckEvent;[\s\S]*?function showDamageText\(x, y, dmg\) \{/m;
const replacement = `if (typeof state.isLuckEvent === 'boolean') isLuckEvent = state.isLuckEvent;
                return true;
            } catch(e) {
                return false;
            }
        }

        function showDamageText(x, y, dmg) {`;
code = code.replace(fixRegex, replacement);

fs.writeFileSync('index.html', code);
console.log('Fixed loadGame');
