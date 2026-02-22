const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the ternary pattern: `...' : ''}  -> `...` : ''}
// We target the sequence: ': ''} and replace with `: ''}
// Also handles ": ""}
content = content.replace(/': ''\}/g, "` : ''}");
content = content.replace(/": ""\}/g, "` : ''}");

// Fix the showToast one specifically
content = content.replace(/'\);\},/g, "`);\n  },");

// Fix any trailing ': ''
content = content.replace(/': ''/g, "` : ''");

fs.writeFileSync(filePath, content);
console.log('✅ Successfully applied deep syntax fixes in app.js');
