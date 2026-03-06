const apiBaseUrl = 'https://restaurant-99en.onrender.com';
const placeId = 13;
const targetImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Gavi%2C_Kerala.jpg/1280px-Gavi%2C_Kerala.jpg';

async function verify() {
    console.log('🔍 Checking deployment status...');
    const rootResp = await fetch(`${apiBaseUrl}/`);
    const rootData = await rootResp.json();
    console.log('📊 Server Info:', rootData);

    if (rootData.build_id !== 'BUILD_DEBUG_V5') {
        console.warn('⌛ Latest build (BUILD_DEBUG_V5) is not live yet. Retrying in 30s...');
        return;
    }

    console.log('✅ BUILD_DEBUG_V5 is live! Proceeding with update...');

    const updateUrl = `${apiBaseUrl}/api/admin/places/${placeId}/update`;
    const updateData = {
        name: 'Pathanamthitta',
        description: 'Pilgrim Capital of Kerala',
        image: targetImage
    };

    console.log(`📡 Sending POST update to ${updateUrl}...`);
    const updateResp = await fetch(updateUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    });

    console.log('📟 Update HTTP Status:', updateResp.status);
    const updateResult = await updateResp.json();
    console.log('💾 Update API Result:', updateResult);

    console.log('🔄 Verifying on public API...');
    const placesResp = await fetch(`${apiBaseUrl}/api/restaurants/places`);
    const places = await placesResp.json();
    const place = places.find(p => p.id === placeId);

    if (place && place.image === targetImage) {
        console.log('🎉 SUCCESS! Pathanamthitta image is now persisted as expected.');
    } else {
        console.error('❌ FAILURE: Image URL mismatch in public API.');
        console.log('Exp:', targetImage);
        console.log('Got:', place ? place.image : 'null');
    }
}

verify().catch(err => console.error('🧨 Script Error:', err));
