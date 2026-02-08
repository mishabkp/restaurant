# PowerShell script to automatically add Unsplash images to data.js

$dataFile = "C:\Users\kpmiz\Desktop\restaurant-navigator\js\data.js"
$content = Get-Content $dataFile -Raw

Write-Host "Starting image update process..." -ForegroundColor Green

# Define replacement mappings for places (gradient -> Unsplash URL)
$placeReplacements = @{
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop'
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' = 'https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800&h=600&fit=crop'
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' = 'https://images.unsplash.com/photo-1577659733926-0b8c9c8b9f5b?w=800&h=600&fit=crop'
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' = 'https://images.unsplash.com/photo-1580837119756-563d608dd119?w=800&h=600&fit=crop'
}

# Replace place gradients with images
foreach ($gradient in $placeReplacements.Keys) {
    $replacement = $placeReplacements[$gradient]
    $content = $content -replace [regex]::Escape($gradient), $replacement
}

Write-Host "Updated location images..." -ForegroundColor Yellow

# Define restaurant image gradients
$restaurantGradients = @(
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
)

$restaurantImages = @(
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1515669097368-22e68427d265?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=600&fit=crop'
)

# Replace remaining restaurant gradients
$index = 0
foreach ($gradient in $restaurantGradients) {
    $pattern = [regex]::Escape($gradient)
    $replacement = $restaurantImages[$index % $restaurantImages.Count]
    $content = $content -replace $pattern, $replacement
    $index++
}

Write-Host "Updated restaurant images..." -ForegroundColor Yellow

# Food image URLs
$foodImageUrls = @(
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626074353765-517a65faa902?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1580959375944-0d0c4f45d154?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1560900318-b9ce1eebbb24?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop'
)

# Find all food items without images
$pattern = '\{ name: "([^"]+)", category: "([^"]+)", price: "([^"]+)", description: "([^"]+)" \}'
$matches = [regex]::Matches($content, $pattern)

Write-Host "Found $($matches.Count) food items without images" -ForegroundColor Yellow

# Add images to food items
$imageIndex = 0
foreach ($match in $matches) {
    $imageUrl = $foodImageUrls[$imageIndex % $foodImageUrls.Count]
    $replacement = '{ name: "' + $match.Groups[1].Value + '", category: "' + $match.Groups[2].Value + '", price: "' + $match.Groups[3].Value + '", description: "' + $match.Groups[4].Value + '", image: "' + $imageUrl + '" }'
    
    $content = $content -replace [regex]::Escape($match.Value), $replacement
    $imageIndex++
}

Write-Host "Added images to $($matches.Count) food items!" -ForegroundColor Green

# Save the updated content
Set-Content -Path $dataFile -Value $content -NoNewline

Write-Host ""
Write-Host "Image update complete!" -ForegroundColor Green
Write-Host "Updated file: $dataFile" -ForegroundColor Cyan
Write-Host "Please refresh your browser to see the changes." -ForegroundColor Yellow
