
$filePath = "c:\Users\kpmiz\OneDrive\antigravity\restaurant-navigator\js\data.js"
$content = Get-Content $filePath -Raw

# Replace Unsplash/Pexels URLs in food items with refined Pollinations prompts
# Pattern: { name: "...", ..., description: "...", image: "..." }
$newContent = $content -replace '({ name: "([^"]+)", [^}]+?description: "([^"]+)", image: "https://images\.(unsplash|pexels)\.com/[^"]+" })', {
    param($match)
    $obj = $match.Groups[1].Value
    $name = $match.Groups[2].Value
    $desc = $match.Groups[3].Value
    
    $cleanName = $name -replace '[^a-zA-Z0-9 ]', ''
    $cleanDesc = $desc -replace '[^a-zA-Z0-9 ]', ''
    $prompt = "high-quality-gourmet-food-photography-of-$cleanName-$cleanDesc-professional-lighting-no-people-no-hands-high-quality-4k"
    $newUrl = "https://image.pollinations.ai/prompt/$prompt?width=400&height=300&nologo=true"
    
    return $match.Value -replace 'https://images\.(unsplash|pexels)\.com/[^"]+', $newUrl
}

# Also replace restaurant main images
$newContent = $newContent -replace '(image: "https://images\.(unsplash|pexels)\.com/[^"]+")', {
    param($match)
    # Generic restaurant interior for main images to be safe
    return 'image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Restaurant_interior.jpg"'
}

Set-Content $filePath $newContent
