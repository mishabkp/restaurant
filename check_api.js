const fetch = require('node-fetch');
fetch('https://restaurant-99en.onrender.com/api/restaurants/places')
    .then(res => res.json())
    .then(data => {
        const p = data.find(d => d.id === 13);
        console.log(JSON.stringify(p, null, 2));
    }).catch(err => console.error(err));
