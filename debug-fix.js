const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Increase timeout from 6000 to 30000 (30s)
content = content.replace(/setTimeout\(\(\) => controller\.abort\(\), 6000\)/g, "setTimeout(() => controller.abort(), 30000)");

// 2. Add more logging to handleAuth
const authLogFix = `console.error('Auth Error Details:', {
        message: error.message,
        stack: error.stack,
        url: \`\${this.apiBaseUrl}\${endpoint}\`
      });`;

content = content.replace(/console\.error\('Auth Error:', error\);/g, authLogFix);

// 3. Fix crushed blocks like )};} or )}}
content = content.replace(/\)\};\}/g, ");\n  }\n}");
content = content.replace(/\)\}\}/g, ");\n  }");
content = content.replace(/\}\}/g, "}\n}");
content = content.replace(/catch\s+\(err\)\s+\{/g, "catch (err) {\n      ");
content = content.replace(/catch\s+\(error\)\s+\{/g, "catch (error) {\n      ");

fs.writeFileSync(filePath, content);
console.log('✅ Successfully updated app.js with better timeout and logging');
