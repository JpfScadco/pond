# Pond Game API Integration

This enhanced version of The Pond game includes API integration to track player scores when they die.

## 🎯 Features Added

- **Score Tracking**: Automatically counts fish eaten by the player
- **Death Event API**: Sends HTTP request with score data when player dies
- **Session Management**: Unique session IDs for each game
- **Configurable**: Easy setup through config file
- **Debug Logging**: Console messages for testing and debugging

## 🚀 Quick Start

1. **Start the game**:
   ```bash
   docker run -d -p 3000:3000 pond:v2
   ```

2. **Open the game**: http://localhost:3000

3. **Configure API** (optional):
   - Edit `config.js`
   - Set `enabled: true`
   - Add your API endpoint and key

## ⚙️ Configuration

Edit the `config.js` file:

```javascript
window.API_CONFIG = {
  enabled: true,                                    // Enable API calls
  endpoint: 'https://your-api.com/api/game/score', // Your API URL
  apiKey: 'your-secret-api-key',                   // Your API key
  timeout: 5000                                    // Request timeout (ms)
};
```

## 📡 API Payload

When a player dies, the game sends a POST request with this data:

```json
{
  "sessionId": "game_1691234567890_abc123def",
  "fishEaten": 15,
  "finalSize": 45.6,
  "gameTime": 123456,
  "timestamp": "2024-08-08T09:30:00.000Z",
  "userAgent": "Mozilla/5.0..."
}
```

### Field Descriptions

- `sessionId`: Unique identifier for this game session
- `fishEaten`: Number of fish the player consumed
- `finalSize`: Player's final size when they died
- `gameTime`: Game duration in milliseconds
- `timestamp`: ISO timestamp of when the player died
- `userAgent`: Browser user agent string

## 🔧 Headers Sent

```
Content-Type: application/json
Authorization: Bearer your-api-key-here
X-Game-Version: 1.0
```

## 🖥️ Example Server Implementation

### Node.js/Express
```javascript
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
  
  // Save to database or process the score
  console.log('Score received:', { sessionId, fishEaten, finalSize, gameTime });
  
  res.json({ success: true, message: 'Score recorded' });
});

app.listen(3001, () => console.log('API server running on port 3001'));
```

### Python/Flask
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/game/score', methods=['POST'])
def record_score():
    auth_header = request.headers.get('Authorization', '')
    api_key = auth_header.replace('Bearer ', '')
    
    if api_key != 'your-api-key-here':
        return jsonify({'error': 'Invalid API key'}), 401
    
    data = request.json
    print(f"Score received: {data}")
    
    return jsonify({'success': True, 'message': 'Score recorded'})

if __name__ == '__main__':
    app.run(port=3001)
```

## 🧪 Testing

1. **Run the test script**:
   ```powershell
   .\test-api.ps1
   ```

2. **Manual testing**:
   - Open http://localhost:3000
   - Play the game and eat some fish
   - Let your fish die
   - Check browser console (F12) for debug messages

3. **Debug mode**:
   - API calls are disabled by default
   - Console shows what would be sent
   - Enable in `config.js` for live testing

## 📝 Debug Messages

When playing the game, check the browser console for:

```
API tracking initialized. Session ID: game_1691234567890_abc123def
Fish eaten: 1
Fish eaten: 2
...
Sending death score: {sessionId: "...", fishEaten: 5, ...}
```

## 🔒 Security Considerations

- Use HTTPS for your API endpoint
- Keep your API key secure and private
- Validate all incoming data on your server
- Consider rate limiting to prevent abuse
- Log API calls for monitoring

## 🎮 Game Controls

- **Mouse/Touch**: Point to move the fish
- **Keyboard**: Arrow keys to move
- **Goal**: Eat smaller fish to grow, avoid bigger fish

## 📂 Files Modified/Added

- `api.js` - Core API functionality
- `config.js` - Configuration settings
- `main.js` - Game integration
- `index.html` - Script loading
- `test-api.ps1` - Testing script

## 🐛 Troubleshooting

**Game not loading?**
- Check if Docker container is running: `docker ps`
- Verify port 3000 is available

**API not working?**
- Check `config.js` has `enabled: true`
- Verify API endpoint and key are correct
- Check browser console for error messages

**Scores not being sent?**
- Ensure you die in the game (get eaten)
- Check network tab in browser dev tools
- Verify your API server is running and accessible

## 📄 License

Same as original Pond game (GPL License)
