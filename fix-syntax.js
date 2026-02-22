const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the syntax error created by previous attempt: 
// It created `${this.apiBaseUrl}/api/...', {  (mismatched quotes)
// We need to match `${this.apiBaseUrl}/api/... followed by ' or " and change that ending quote to `
content = content.replace(/(\$\{this\.apiBaseUrl\}\/api\/[^\'\"]+)([\'\"])/g, "$1` ");

fs.writeFileSync(filePath, content);
console.log('✅ Successfully corrected syntax errors in app.js');
