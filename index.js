// index.js
const https = require('https');


class MinecraftServerStatus {
    constructor(apiKey = null) {
        this.apiKey = apiKey;
    }


    async checkJava(ip, port = 25565, premium = false) {
        return this._makeRequest('java', ip, port, premium);
    }

    async checkBedrock(ip, port = 19132, premium = false) {
        return this._makeRequest('bedrock', ip, port, premium);
    }

    _makeRequest(edition, ip, port, premium) {
        if (!ip) {
            return Promise.reject(new Error('IP is required'));
        }

        const queryParams = new URLSearchParams();
        queryParams.append('ip', ip);
        
        if (port) {
            queryParams.append('port', port.toString());
        }
        
        if (this.apiKey) {
            queryParams.append('api_key', this.apiKey);
        }
        
        if (premium) {
            queryParams.append('premium', premium.toString());
        }

        const options = {
            hostname: 'api.fryde.id.lv',
            path: `/v1/minecraft/${edition}?${queryParams.toString()}`,
            headers: {
                'User-Agent': "Node.js GGLVXD/MinecraftServerStatus"
            }
        };

        return new Promise((resolve, reject) => {
            const req = https.get(options, (res) => {
                let data = '';

                res.on('data', (chunk) => {
                    data += chunk;
                });

                res.on('end', () => {
                    try {
                        const parsed = JSON.parse(data);
                        if (res.statusCode >= 400) {
                            reject(parsed);
                        } else {
                            resolve(parsed);
                        }
                    } catch (e) {
                        reject(new Error('Failed to parse'));
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.end();
        });
    }
}

module.exports = MinecraftServerStatus;