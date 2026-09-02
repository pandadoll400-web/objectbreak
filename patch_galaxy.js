const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const regex = /<div id="world1Btn"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newHtml = `
                <!-- 1 Galaxy -->
                <div style="text-align: left; border-bottom: 2px solid #555; padding-bottom: 5px; margin-bottom: 15px;">
                    <h3 style="color: #3498db; margin: 0; font-size: 20px;">🌌 1 은하 (1 Galaxy)</h3>
                </div>

                <div id="world1Btn" onclick="goToWorld(1)" style="background-color: #34495e; padding: 15px; border: 3px solid #2ecc71; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 0 10px rgba(46, 204, 113, 0.5); cursor: pointer; transition: 0.2s;">
                    <h3 style="color: #2ecc71; margin: 0; font-size: 24px; -webkit-text-stroke: 1px black;">🌍 1세계</h3>
                    <p id="world1Status" style="color: #fff; margin-top: 5px; margin-bottom: 0; font-weight: bold;">(현재 접속 중)</p>
                </div>
                
                <div id="world2Btn" onclick="goToWorld(2)" style="background-color: #555; padding: 15px; border: 3px solid #000; border-radius: 8px; cursor: pointer; transition: 0.2s;">
                    <h3 style="color: #bdc3c7; margin: 0; font-size: 24px; -webkit-text-stroke: 1px black;">🌌 2세계</h3>
                    <p id="world2Req" style="color: #f1c40f; margin-top: 5px; margin-bottom: 0; font-size: 14px; font-weight: bold;">해금 조건: 4성 플라즈마 캐논 1개 보유</p>
                    <p id="world2Status" style="color: #aaa; margin-top: 5px; margin-bottom: 0; font-size: 12px; font-weight: bold;"></p>
                </div>
                
                <div id="world3Btn" onclick="goToWorld(3)" style="background-color: #333; padding: 15px; border: 3px dashed #ff9f43; border-radius: 8px; margin-top: 20px; cursor: pointer; transition: 0.2s;">
                    <h3 style="color: #f1c40f; margin: 0; font-size: 24px; -webkit-text-stroke: 1px black;">🪐 3세계 (관리자만 가능)</h3>
                    <p id="world3Req" style="color: #ff9f43; margin-top: 5px; margin-bottom: 0; font-size: 14px; font-weight: bold;">해금 조건: 디바인 아이템 3개 보유</p>
                </div>

                <!-- 2 Galaxy -->
                <div style="text-align: left; border-bottom: 2px solid #555; padding-bottom: 5px; margin-bottom: 15px; margin-top: 30px;">
                    <h3 style="color: #e74c3c; margin: 0; font-size: 20px;">🌠 2 은하 (2 Galaxy)</h3>
                </div>

                <div id="world4Btn" onclick="showSystemMessage('아직 해금되지 않은 은하입니다.', '#e74c3c')" style="background-color: #222; padding: 15px; border: 3px dashed #7f8c8d; border-radius: 8px; cursor: not-allowed; opacity: 0.7;">
                    <h3 style="color: #7f8c8d; margin: 0; font-size: 24px; -webkit-text-stroke: 1px black;">❓ 1세계 (???)</h3>
                    <p style="color: #e74c3c; margin-top: 5px; margin-bottom: 0; font-weight: bold;">(접근 불가)</p>
                </div>

            </div>
        </div>
    </div>`;

code = code.replace(regex, newHtml);

// Also add a quick update to the modal styling so it scrolls if too tall
const modalInnerRegex = /<div style="background-color: #2b2b2b; width: 450px; border: 4px solid #000; border-radius: 8px; overflow: hidden; font-family: 'Arial', sans-serif;">\s*<div style="background-color: #8e44ad;/;
code = code.replace(modalInnerRegex, `<div style="background-color: #2b2b2b; width: 450px; max-height: 80vh; border: 4px solid #000; border-radius: 8px; overflow-y: auto; overflow-x: hidden; font-family: 'Arial', sans-serif;">
            <div style="background-color: #8e44ad;`);

fs.writeFileSync('index.html', code);
console.log('UI Patched!');
