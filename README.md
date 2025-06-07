# Minecraft Server Status API Wrapper

A simple Node.js wrapper for the Minecraft server status API (https://api.fryde.id.lv) that provides an easy way to check the status of both Java and Bedrock edition Minecraft servers.

## Features

- **Pure Node.js** - No external dependencies
- **Dual Edition Support** - Check both Java and Bedrock servers
- **Simple API** - Promise-based interface
- **Error Handling** - Proper error propagation
- **Configurable** - Optional API key support

## Ratelimit
- With API key: 100 requests/minute
- Without API key: 50 requests/minute

## Installation

```bash
npm install @gglvxd/minecraftserverstatus
```

## Usage

### Basic Usage

```javascript
const MinecraftServerStatus = require('@gglvxd/minecraftserverstatus');

// Create instance (API key optional)
const statusChecker = new MinecraftServerStatus(); 

// Check Java server
statusChecker.checkJava('mc.hypixel.net')
    .then(status => console.log('Java Server Status:', status))
    .catch(error => console.error('Error:', error));

// Check Bedrock server
statusChecker.checkBedrock('hivebedrock.network')
    .then(status => console.log('Bedrock Server Status:', status))
    .catch(error => console.error('Error:', error));
```

### With API Key

Get your api key at https://fryde.id.lv/dashboard/apikey

```javascript
const statusChecker = new MinecraftServerStatus('your_api_key_here');
```

### With Async/Await

```javascript
async function checkServers() {
    try {
        const javaStatus = await statusChecker.checkJava('mc.hypixel.net');
        console.log('Java Server Online:', javaStatus.online);
        
        const bedrockStatus = await statusChecker.checkBedrock('hivebedrock.network');
        console.log('Bedrock Players Online:', bedrockStatus.players.online);
    } catch (error) {
        console.error('Error checking servers:', error);
    }
}

checkServers();
```

## API Reference

### `new MinecraftServerStatus([apiKey])`

Creates a new instance of the status checker.

- `apiKey` (String, optional): Your API key if you have one

### Methods

#### `checkJava(ip, [port], [premium])`

Checks the status of a Java edition server.

- `ip` (String, required): Server IP address
- `port` (Number, optional, default=25565): Server port
- `premium` (Boolean, optional, default=false): Use premium points
- Returns: Promise that resolves with server status object

#### `checkBedrock(ip, [port], [premium])`

Checks the status of a Bedrock edition server.

- `ip` (String, required): Server IP address
- `port` (Number, optional, default=19132): Server port
- `premium` (Boolean, optional, default=false): Use premium points
- Returns: Promise that resolves with server status object

## Response Format

### Java Edition Example

```json
{
  "online": true,
  "ip": "mc.hypixel.net",
  "port": 25565,
  "version": "Requires MC 1.8 / 1.21",
  "protocol": 47,
  "players": {
    "online": 41844,
    "max": 200000
  },
  "motd": {
    "raw": "§f                §aHypixel Network §c[1.8-1.21]§f\n        §d§lSKYWARS UPDATE §7- §b§lDISASTERS v0.3",
    "clean": "                Hypixel Network [1.8-1.21]\n        SKYWARS UPDATE - DISASTERS v0.3"
  },
  "favicon": "data:image/png;base64,..."
}
```

### Bedrock Edition Example

```json
{
  "online": true,
  "ip": "hivebedrock.network",
  "port": 19132,
  "version": {
    "name": "1.0",
    "protocol": 121
  },
  "players": {
    "online": 23065,
    "max": 100001
  },
  "edition": "MCPE",
  "motd": {
    "raw": "§fBEDWARS + BUILD BATTLE§f\nHive Games",
    "clean": "BEDWARS + BUILD BATTLE\nHive Games"
  },
  "gameMode": "Survival",
  "serverGUID": "1747355109132437"
}
```

## Error Handling

The API may return errors with the following status codes:

- `400`: Missing required parameters
- `429`: Rate limit exceeded
- `500`: Server error
- `503`: Server offline/unreachable

These errors will be rejected as promises with the error object from the API.

## License

MIT
