const apiBaseUrl = 'https://restaurant-99en.onrender.com';
const placeId = 13; // Pathanamthitta

async function test() {
    console.log(`📡 Testing GET /api/admin/stats...`);
    const url = `${apiBaseUrl}/api/admin/orders`;

    try {
        const resp = await fetch(url, {

        });

        console.log(`📟 Status: ${resp.status} ${resp.statusText}`);
        const body = await resp.text();
        console.log(`📄 Response Body: ${body}`);

        try {
            const json = JSON.parse(body);
            console.log('📦 JSON Data:', json);
        } catch (e) {
            console.log('⚠️ Response is not JSON');
        }
    } catch (err) {
        console.error('🧨 Network Error:', err.message);
    }
}

test();
