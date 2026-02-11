const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const promoteUser = async (email) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        const user = await User.findOneAndUpdate({ email: email }, { role: 'admin' }, { new: true });
        if (user) {
            console.log(`✅ User ${email} is now an Admin!`);
        } else {
            console.log(`❌ User ${email} not found.`);
        }
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

const email = process.argv[2];
if (!email) {
    console.log('Please provide an email: node make-admin.js user@example.com');
    process.exit(1);
}

promoteUser(email);
