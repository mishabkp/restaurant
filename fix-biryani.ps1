# PowerShell script to fix food images with correct matching
$dataFile = "C:\Users\kpmiz\Desktop\restaurant-navigator\js\data.js"
$content = Get-Content $dataFile -Raw

Write-Host "Starting image fix..." -ForegroundColor Green

# Simple find and replace - each line is one replacement
$replacements = @(
    @('\"Biryani\", category: \"Main Course\", price: \"₹350\", description: \"Fragrant rice with meat\", image: \"[^\"]+\"', '\"Biryani\", category: \"Main Course\", price: \"₹350\", description: \"Fragrant rice with meat\", image: \"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop\"'),
    @('\"Biriyani\", category: \"Main Course\", price: \"₹320\", description: \"Malabar style biryani\", image: \"[^\"]+\"', '\"Biriyani\", category: \"Main Course\", price: \"₹320\", description: \"Malabar style biryani\", image: \"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop\"'),
    @('\"Chicken Biryani\", category: \"Main Course\", price: \"₹220\", description: \"Coconut-based biryani\", image: \"[^\"]+\"', '\"Chicken Biryani\", category: \"Main Course\", price: \"₹220\", description: \"Coconut-based biryani\", image: \"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop\"'),
    @('\"Chicken Biryani\", category: \"Main Course\", price: \"₹260\", description: \"Flavorful rice with chicken\", image: \"[^\"]+\"', '\"Chicken Biryani\", category: \"Main Course\", price: \"₹260\", description: \"Flavorful rice with chicken\", image: \"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop\"'),
    @('\"Thalassery Biryani\", category: \"Main Course\", price: \"₹300\", description: \"Famous Thalassery style\", image: \"[^\"]+\"', '\"Thalassery Biryani\", category: \"Main Course\", price: \"₹300\", description: \"Famous Thalassery style\", image: \"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop\"'),
    @('\"Thalassery Biryani\", category: \"Main Course\", price: \"₹320\", description: \"Special biryani\", image: \"[^\"]+\"', '\"Thalassery Biryani\", category: \"Main Course\", price: \"₹320\", description: \"Special biryani\", image: \"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop\"'),
   @('\"Veg Biryani\", category: \"Main Course\", price: \"₹200\", description: \"Vegetable biryani\", image: \"[^\"]+\"', '\"Veg Biryani\", category: \"Main Course\", price: \"₹200\", description: \"Vegetable biryani\", image: \"https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400&h=300&fit=crop\"'),
    @('\"Prawn Biriyani\", category: \"Main Course\", price: \"₹420\", description: \"Prawn biryani\", image: \"[^\"]+\"', '\"Prawn Biriyani\", category: \"Main Course\", price: \"₹420\", description: \"Prawn biryani\", image: \"https://images.unsplash.com/photo-1633357948663-867d289268e0?w=400&h=300&fit=crop\"')
)

$count = 0
foreach ($rep in $replacements) {
    $content = $content -replace $rep[0], $rep[1]
    $count++
}

Write-Host "Applied $count fixes" -ForegroundColor Yellow

# Save
Set-Content -Path $dataFile -Value $content -NoNewline

Write-Host "Complete! Refresh browser with Ctrl+Shift+R" -ForegroundColor Green
