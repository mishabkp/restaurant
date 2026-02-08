# PowerShell script to assign correct matching images to food items

$dataFile = "C:\Users\kpmiz\Desktop\restaurant-navigator\js\data.js"
$content = Get-Content $dataFile -Raw

Write-Host "Starting intelligent image assignment..." -ForegroundColor Green

# Create a mapping of food names to appropriate Unsplash image URLs
# Using search queries that match the food items
$foodImageMapping = @{
    # Biryani variants
    'Biryani' = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop'
    'Biriyani' = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop'
    'Chicken Biryani' = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop'
    'Veg Biryani' = 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop'
    'Prawn Biriyani' = 'https://images.unsplash.com/photo-1633357948663-867d289268e0?w=400&h=300&fit=crop'
    'Thalassery Biryani' = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop'
    'Kappa Biriyani' = 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop'
    
    # Chicken dishes
    'Butter Chicken' = 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop'
    'Tandoori Chicken' = 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop'
    'Chicken Ghee Roast' = 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop'
    'Grilled Chicken' = 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop'
    'Chicken Tikka' = 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop'
    'Kozhi Ularthiyathu' = 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop'
    'Chicken 65' = 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400&h=300&fit=crop'
    
    # Seafood
    'Prawn Cocktail' = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop'
    'Fish Fingers' = 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop'
    'Grilled Calamari' = 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400&h=300&fit=crop'
    'Lobster Thermidor' = 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400&h=300&fit=crop'
    'Grilled Salmon' = 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop'
    'Seafood Platter' = 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400&h=300&fit=crop'
    'Fish and Chips' = 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400&h=300&fit=crop'
    'Karimeen Pollichathu' = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop'
    'Kane Fry' = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop'
    'Fish Curry Rice' = 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop'
    'Prawn Gassi' = 'https://images.unsplash.com/photo-1633945274068-9cbda9b190eb?w=400&h=300&fit=crop'
    'Kallummakaya Fry' = 'https://images.unsplash.com/photo-1615361200098-20a18fcc2409?w=400&h=300&fit=crop'
    'Meen Curry' = 'https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop'
    'Pulimunchi' = 'https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop'
    
    # Paneer dishes
    'Paneer Tikka' = 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    'Paneer Butter Masala' = 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop'
    
    # Pasta & Pizza
    'Truffle Pasta' = 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop'
    'Margherita Pizza' = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop'
    'Lasagna' = 'https://images.unsplash.com/photo-1619895092538-128341789043?w=400&h=300&fit=crop'
    
    # Starters
    'Bruschetta' = 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop'
    'Caesar Salad' = 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop'
    'Garlic Bread' = 'https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=400&h=300&fit=crop'
    'Samosa Platter' = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    'Banana Chips' = 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=300&fit=crop'
    
    # Kerala specials
    'Kerala Sadya' = 'https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop'
    'Beef Fry' = 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop'
    'Appam with Stew' = 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop'
    'Puttu Kadala' = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop'
    'Neer Dosa' = 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop'
    'Kori Rotti' = 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop'
    'Patoleo' = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop'
    
    # Breads
    'Naan Basket' = 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop'
    'Rotis' = 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop'
    
    # Curries & Dal
    'Dal Makhani' = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
    'Kadala Curry' = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
    
    # Desserts
    'Tiramisu' = 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop'
    'Chocolate Lava Cake' = 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop'
    'Panna Cotta' = 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop'
    'Payasam' = 'https://images.unsplash.com/photo-1663847697988-48c5b34580dd?w=400&h=300&fit=crop'
    'Unniyappam' = 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop'
    'Ada Pradhaman' = 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=400&h=300&fit=crop'
    'Cheesecake' = 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop'
    'Gelato' = 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop'
    'Brownie Sundae' = 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop'
    'Gulab Jamun' = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop'
    'Rasmalai' = 'https://images.unsplash.com/photo-1645696329735-dfd9367b1c95?w=400&h=300&fit=crop'
    'Ras Malai' = 'https://images.unsplash.com/photo-1645696329735-dfd9367b1c95?w=400&h=300&fit=crop'
    'Kulfi' = 'https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop'
    'Halwa' = 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=300&fit=crop'
    'Banana Halwa' = 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop'
    'Jalebi' = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop'
}

Write-Host "Created mapping for $($foodImageMapping.Count) specific food items" -ForegroundColor Yellow

# Function to find and replace food item images
$updatedCount = 0

foreach ($foodName in $foodImageMapping.Keys) {
    $imageUrl = $foodImageMapping[$foodName]
    
    # Pattern to match the food item with any existing image URL
    $pattern = '\{ name: "' + [regex]::Escape($foodName) + '", category: "([^"]+)", price: "([^"]+)", description: "([^"]+)", image: "[^"]+" \}'
    
    if ($content -match $pattern) {
        # Replace with the correct image URL
        $replacement = '{ name: "' + $foodName + '", category: "$1", price: "$2", description: "$3", image: "' + $imageUrl + '" }'
        $content = $content -replace $pattern, $replacement
        $updatedCount++
        Write-Host "  ✓ Updated: $foodName" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Updated $updatedCount food items with correct matching images!" -ForegroundColor Green

# Save the updated content
Set-Content -Path $dataFile -Value $content -NoNewline

Write-Host ""
Write-Host "Image correction complete!" -ForegroundColor Green
Write-Host "Updated file: $dataFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Hard refresh your browser (Ctrl + Shift + R)" -ForegroundColor White
Write-Host "2. Biryani will now show biryani images!" -ForegroundColor White
