const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'app.js');
let content = fs.readFileSync(filePath, 'utf8');

// Fix specific mismatched pattern: `...': ''}  -> `...` : ''}
// This is common in ternary operators inside template literals
content = content.replace(/`([^'"`\n]+)': ''\}/g, "`$1` : ''}");

// Fix the individual ones seen in find-mismatched
content = content.replace(/`🎉 Room "\$\{roomType\}'booked!/g, "`🎉 Room \"${roomType}\" booked!");
content = content.replace(/'booked! \$\{checkin\} to \$\{checkout\} for \$\{guests\}\. Total: \$\{price\}\/night'\);\},/g, " booked! ${checkin} to ${checkout} for ${guests}. Total: ${price}/night`);\n  },");

fs.writeFileSync(filePath, content);
console.log('✅ Successfully applied final syntax fixes in app.js');
