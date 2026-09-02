const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /<h3 style="color: #f1c40f; margin: 0; font-size: 24px; -webkit-text-stroke: 1px black;">🪐 3세계 \(관리자만 가능\)<\/h3>\s*<p id="world3Req" style="color: #ff9f43; margin-top: 5px; margin-bottom: 0; font-size: 14px; font-weight: bold;">해금 조건: 디바인 아이템 3개 보유<\/p>/;

const newHtml = `<h3 style="color: #f1c40f; margin: 0; font-size: 24px; -webkit-text-stroke: 1px black;">🪐 3세계 (9월 5일 정식 공개!)</h3>
                    <p id="world3Req" style="color: #ff9f43; margin-top: 5px; margin-bottom: 0; font-size: 14px; font-weight: bold;">해금 조건: 디바인 아이템 3개 보유 (현재는 관리자만 가능)</p>`;

code = code.replace(regex, newHtml);

fs.writeFileSync('index.html', code);
console.log('World 3 text updated!');
