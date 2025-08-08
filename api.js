// API configuration and score tracking
var API = {
  // Configuration - you can modify these values
  config: {
    enabled: true, // Set to false to disable API calls
    endpoint: 'https://your-api-endpoint.com/scores', // Replace with your API endpoint
    apiKey: 'your-api-key-here', // Replace with your API key
    timeout: 5000 // Request timeout in milliseconds
  },
  
  // Track player statistics
  stats: {
    fishEaten: 0,
    gameStartTime: null,
    sessionId: null
  },

  // Generate a unique session ID for this game session
  generateSessionId: function() {
    return 'game_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Initialize API tracking
  init: function() {
    this.stats.sessionId = this.generateSessionId();
    this.stats.gameStartTime = Date.now();
    this.stats.fishEaten = 0;
    console.log('API tracking initialized. Session ID:', this.stats.sessionId);
  },

  // Increment fish eaten counter
  incrementFishEaten: function() {
    this.stats.fishEaten++;
    console.log('Fish eaten:', this.stats.fishEaten);
  },

  // Send score when player dies
  sendDeathScore: function(playerSize, gameTime) {
    if (!this.config.enabled) {
      console.log('API calls disabled. Would have sent score:', this.stats.fishEaten);
      return;
    }

    var scoreData = {
      sessionId: this.stats.sessionId,
      fishEaten: this.stats.fishEaten,
      finalSize: playerSize || 0,
      gameTime: gameTime || (Date.now() - this.stats.gameStartTime),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    console.log('Sending death score:', scoreData);
    this.makeAPIRequest(scoreData);
  },

  // Make the actual HTTP request
  makeAPIRequest: function(data) {
    var xhr = new XMLHttpRequest();
    var self = this;

    xhr.open('POST', this.config.endpoint, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.config.apiKey);
    xhr.setRequestHeader('X-Game-Version', '1.0');

    xhr.timeout = this.config.timeout;

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('Score successfully sent to API');
        console.log('Server response:', xhr.responseText);
      } else {
        console.error('Failed to send score. Status:', xhr.status);
        console.error('Response:', xhr.responseText);
      }
    };

    xhr.onerror = function() {
      console.error('Network error while sending score to API');
    };

    xhr.ontimeout = function() {
      console.error('API request timed out after', self.config.timeout, 'ms');
    };

    try {
      xhr.send(JSON.stringify(data));
    } catch (error) {
      console.error('Error sending API request:', error);
    }
  },

  // Update API configuration (useful for testing)
  updateConfig: function(newConfig) {
    for (var key in newConfig) {
      if (newConfig.hasOwnProperty(key)) {
        this.config[key] = newConfig[key];
      }
    }
    console.log('API config updated:', this.config);
  }
};

// Initialize API when the script loads
if (typeof window !== 'undefined') {
  window.API = API;
}
