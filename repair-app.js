const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// fix < h1, < div, < /h1, etc.
content = content.replace(/<\s+/g, '<');
content = content.replace(/\s+>/g, '>');
content = content.replace(/<\//g, '</'); // ensure no space in closing tag
content = content.replace(/<\/\s+/g, '</');

// fix ${ ... }
content = content.replace(/\$\{\s+/g, '${');
content = content.replace(/\s+\}/g, '}');

// fix = "
content = content.replace(/\s+=\s+"/g, '="');
content = content.replace(/=\s+"/g, '="');

// fix / api /
content = content.replace(/\/\s+api\s+\//g, '/api/');

fs.writeFileSync(filePath, content);
console.log('✅ Successfully repaired systematic corruption in app.js');
