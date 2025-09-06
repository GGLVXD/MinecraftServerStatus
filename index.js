// index.js


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

    async _makeRequest(edition, ip, port, premium) {
        if (!ip) {
            throw new Error('IP is required');
        }

        const QUERYPARAMS = new URLSearchParams();
        QUERYPARAMS.append('ip', ip);
        
        if (port) {
            QUERYPARAMS.append('port', port.toString());
        }
        
        if (this.apiKey) {
            QUERYPARAMS.append('api_key', this.apiKey);
        }
        
        if (premium) {
            QUERYPARAMS.append('premium', premium.toString());
        }

        const URL = `https://api.fryde.id.lv/v1/minecraft/${edition}?${QUERYPARAMS.toString()}`;
        const TIMEOUT = setTimeout(() => controller.abort(), 20000);
        const OPTIONS = {
            headers: {
                'User-Agent': 'Node.js GGLVXD/MinecraftServerStatus'
            }
        };

        try {
            const RESPONSE = await fetch(URL, OPTIONS);
            clearTimeout(TIMEOUT);
            
            if (!RESPONSE.ok) {
                const errorData = await RESPONSE.json();
                throw errorData;
            }
            
            return await RESPONSE.json();
        } catch (error) {
            clearTimeout(TIMEOUT);
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('Network failed');
            }
            throw error;
        }
    }
}

module.exports = MinecraftServerStatus;