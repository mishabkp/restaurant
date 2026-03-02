$json = Get-Content -Path 'c:\Users\kpmiz\OneDrive\antigravity\restaurant-navigator\raw_places.json' -Raw | ConvertFrom-Json
$place = $json | Where-Object { $_.name -like '*Pathanamthitta*' }
if ($place) {
    $place | ConvertTo-Json -Depth 5
} else {
    Write-Output "Not Found"
}
