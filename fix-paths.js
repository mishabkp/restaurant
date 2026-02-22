const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Replace fetch('/api/ with fetch(`${this.apiBaseUrl}/api/
content = content.replace(/fetch\('\/api\//g, "fetch(`${this.apiBaseUrl}/api/");

// Replace fetch(`/api/ with fetch(`${this.apiBaseUrl}/api/
content = content.replace(/fetch\(`\/api\//g, "fetch(`${this.apiBaseUrl}/api/");

fs.writeFileSync(filePath, content);
console.log('✅ Successfully fixed API fetch paths in app.js');
