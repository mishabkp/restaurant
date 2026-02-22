const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the corrupted pattern: ` Text' -> 'Text'
content = content.replace(/`\s+([^'"`\n]+)'/g, "'$1'");

// Also check for " Text`
content = content.replace(/"\s+([^'"`\n]+)`/g, "'$1'");

fs.writeFileSync(filePath, content);
console.log('✅ Successfully fixed corrupted quote patterns in app.js');
