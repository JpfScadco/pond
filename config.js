// API Configuration File
// Modify this file to set up your API endpoint and key

// To set up the API integration:
// 1. Replace 'your-api-endpoint.com' with your actual API URL
// 2. Replace 'your-api-key-here' with your actual API key
// 3. Set enabled to true to activate API calls
window.API_CONFIG = {
  enabled: true, // Set to true to enable API calls
  endpoint: 'https://your-api-endpoint.com/api/game/score', // Your API endpoint
  apiKey: 'your-api-key-here', // Your API key
  timeout: 5000 // Request timeout in milliseconds
};

// Example of what the API should expect:
// POST request to your endpoint with JSON body:
// {
//   "sessionId": "game_1691234567890_abc123def",
//   "fishEaten": 15,
//   "finalSize": 45.6,
//   "gameTime": 123456,
//   "timestamp": "2024-08-08T09:30:00.000Z",
//   "userAgent": "Mozilla/5.0..."
// }

// Example API endpoint implementation (Node.js/Express):
/*
app.post('/api/game/score', (req, res) => {
  const { sessionId, fishEaten, finalSize, gameTime, timestamp } = req.body;
  
  // Verify API key
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  if (apiKey !== 'your-api-key-here') {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  // Save score to database
  console.log('New game score:', {
    sessionId,
    fishEaten,
    finalSize,
    gameTime,
    timestamp
  });
  
  // Respond with success
  res.json({ success: true, message: 'Score recorded' });
});
*/

// Apply configuration when this script loads
if (typeof API !== 'undefined' && typeof API_CONFIG !== 'undefined') {
  API.updateConfig(API_CONFIG);
}
