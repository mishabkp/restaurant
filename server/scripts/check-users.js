require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');

async function checkUser() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const users = await User.find({});
        console.log('Total Users:', users.length);
        console.log('Users in DB:');
        users.forEach(u => {
            console.log(`- ${u.name} (${u.email}) [Role: ${u.role}]`);
        });
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkUser();
