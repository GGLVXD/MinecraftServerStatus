// test.js

const MinecraftServerStatus = require('./index');

async function test() {
    const statusChecker = new MinecraftServerStatus();
    
    try {
        // success java
        console.log('Testing Java server...');
        const javaStatus = await statusChecker.checkJava('mc.hypixel.net');
        console.log('Java Server Status:', javaStatus);
        
        // success bedrock
        console.log('\nTesting Bedrock server...');
        const bedrockStatus = await statusChecker.checkBedrock('hivebedrock.network');
        console.log('Bedrock Server Status:', bedrockStatus);
        
        // error
        console.log('\nTesting error case...');
        try {
            const errorStatus = await statusChecker.checkJava('ThisServerDoesNotExist.net');
            console.log('This should not appear:', errorStatus);
        } catch (error) {
            console.log('Error correctly caught:', error);
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();