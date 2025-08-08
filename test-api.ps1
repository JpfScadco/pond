# API Integration Test Script
# This PowerShell script demonstrates how to test the Pond game API integration

Write-Host "=== Pond Game API Integration Test ===" -ForegroundColor Green

# Test if the game is running
Write-Host "`nTesting game server..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/ping" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Game server is running!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Game server is not responding" -ForegroundColor Red
    Write-Host "Please run: docker run -d -p 3000:3000 pond:v2" -ForegroundColor Yellow
    exit 1
}

# Instructions for setting up the API
Write-Host "`n=== API Setup Instructions ===" -ForegroundColor Cyan
Write-Host "1. Edit the config.js file in your pond directory" -ForegroundColor White
Write-Host "2. Set enabled: true" -ForegroundColor White
Write-Host "3. Replace 'your-api-endpoint.com' with your actual API URL" -ForegroundColor White
Write-Host "4. Replace 'your-api-key-here' with your actual API key" -ForegroundColor White

Write-Host "`n=== What the API receives when a player dies ===" -ForegroundColor Cyan
$examplePayload = @{
    sessionId = "game_1691234567890_abc123def"
    fishEaten = 15
    finalSize = 45.6
    gameTime = 123456
    timestamp = "2024-08-08T09:30:00.000Z"
    userAgent = "Mozilla/5.0..."
} | ConvertTo-Json -Depth 3

Write-Host "Example JSON payload:" -ForegroundColor White
Write-Host $examplePayload -ForegroundColor Gray

Write-Host "`n=== Testing Instructions ===" -ForegroundColor Cyan
Write-Host "1. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "2. Play the game and eat some fish" -ForegroundColor White
Write-Host "3. Let your fish die (get eaten by a bigger fish)" -ForegroundColor White
Write-Host "4. Check browser console (F12) for API debug messages" -ForegroundColor White
Write-Host "5. Current setting: API calls are DISABLED by default" -ForegroundColor Yellow

Write-Host "`n=== Example Server Implementation (Node.js) ===" -ForegroundColor Cyan
$serverExample = @"
const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/game/score', (req, res) => {
  const { sessionId, fishEaten, finalSize, gameTime } = req.body;
  
  // Verify API key
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  if (apiKey !== 'your-api-key-here') {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  console.log('New game score received:', {
    sessionId, fishEaten, finalSize, gameTime
  });
  
  res.json({ success: true, message: 'Score recorded' });
});

app.listen(3001, () => console.log('API server running on port 3001'));
"@

Write-Host $serverExample -ForegroundColor Gray

Write-Host "`n=== Current Configuration ===" -ForegroundColor Cyan
$configPath = "C:\Users\JPFourie\source\pond\config.js"
if (Test-Path $configPath) {
    Write-Host "Config file location: $configPath" -ForegroundColor White
    Write-Host "To enable API calls, edit this file and set enabled: true" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Config file not found at: $configPath" -ForegroundColor Red
}

Write-Host "`n🎮 Game is ready at: http://localhost:3000" -ForegroundColor Green
Write-Host "📖 Open browser console (F12) to see API debug messages" -ForegroundColor Cyan
