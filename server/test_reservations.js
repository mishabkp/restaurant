const http = require('http');

const runTest = async () => {
    try {
        console.log('1. Creating a new reservation...');
        const postData = JSON.stringify({
            userName: 'Test User',
            userEmail: 'test@example.com',
            restaurantId: 999,
            restaurantName: 'Test Restaurant',
            type: 'Table',
            guests: '2',
            date: '2026-03-10',
            time: '08:00 PM',
            reservationId: 'TEST-' + Date.now()
        });

        const req1 = await new Promise((resolve, reject) => {
            const req = http.request({
                hostname: 'localhost',
                port: 5000,
                path: '/api/reservations',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': postData.length
                }
            }, res => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
            });
            req.on('error', reject);
            req.write(postData);
            req.end();
        });

        console.log(`Creation Status: ${req1.status}`);
        if (req1.status !== 201) throw new Error('Creation failed: ' + JSON.stringify(req1.data));
        console.log(`Created Reservation Status: ${req1.data.status}`);
        if (req1.data.status !== 'Pending') throw new Error('Expected Pending status');

        const resId = req1.data.reservationId;

        console.log(`\n2. Confirming reservation ${resId}...`);
        const putData = JSON.stringify({ status: 'Confirmed' });

        const req2 = await new Promise((resolve, reject) => {
            const req = http.request({
                hostname: 'localhost',
                port: 5000,
                path: `/api/reservations/${resId}/status`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': putData.length
                }
            }, res => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
            });
            req.on('error', reject);
            req.write(putData);
            req.end();
        });

        console.log(`Update Status: ${req2.status}`);
        if (req2.status !== 200) throw new Error('Update failed: ' + JSON.stringify(req2.data));
        console.log(`Updated Reservation Status: ${req2.data.status}`);
        if (req2.data.status !== 'Confirmed') throw new Error('Expected Confirmed status');

        console.log('\n✅ All tests passed successfully!');
    } catch (err) {
        console.error('❌ Test failed:', err);
        process.exit(1);
    }
};

runTest();
