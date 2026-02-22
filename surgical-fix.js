const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix '_blank`)
content = content.replace(/'_blank`\)/g, "'_blank')");

// Fix 'hidden`)
content = content.replace(/'hidden`\)/g, "'hidden')");

// Fix 'active`)
content = content.replace(/'active`\)/g, "'active')");

// Fix line 1700 manually (corrupted breadcrumb)
content = content.replace(/<span class="breadcrumb-item'\$\{item\.onClick \? 'onclick="app\.\$\{item\.onClick\.name\}\(\$\{item\.onClick\.toString\(\)\.match\(\/\\d\+\/\)\?\.\[0\] \|\| ''\}\)"' : ''\}>\$\{item\.label\}<\/span>/g, '<span class="breadcrumb-item" ${item.onClick ? `onclick="app.${item.onClick.name}(${item.onClick.toString().match(/\\d+/)?.[0] || ""})"` : ""}>${item.label}</span>');

fs.writeFileSync(filePath, content);
console.log('✅ Successfully applied final surgical fixes in app.js');
