const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix handleAuth fetch
content = content.replace(/fetch\(`\$\{endpoint\}`/g, "fetch(`${this.apiBaseUrl}${endpoint}`");

// Fix tracking fetch spaces
content = content.replace(/fetch\(`\$\{this\.apiBaseUrl\}\s+\/api\/orders\s+\/\s+track\s+\/\s+\$\{orderId\}\s+`/g, "fetch(`${this.apiBaseUrl}/api/orders/track/${orderId}`");

fs.writeFileSync(filePath, content);
console.log('✅ Successfully fixed endpoint and spaces in app.js');
