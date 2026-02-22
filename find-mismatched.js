const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

lines.forEach((line, i) => {
    const count = (line.match(/`/g) || []).length;
    if (count % 2 !== 0) {
        console.log(`Line ${i + 1}: ${line}`);
    }
});
