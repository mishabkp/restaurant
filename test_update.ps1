$body = @{
    name = 'Pathanamthitta'
    description = 'Pilgrim Capital of Kerala'
    image = 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg'
} | ConvertTo-Json

Invoke-RestMethod -Uri 'https://restaurant-99en.onrender.com/api/admin/places/13' -Method Put -Body $body -ContentType 'application/json'
