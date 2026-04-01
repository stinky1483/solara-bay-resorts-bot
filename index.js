const { Client, GatewayIntentBits } = require("discord.js");
const noblox = require("noblox.js");

// Discord client with only necessary intents
const client = new Client({
    intents: [GatewayIntentBits.Guilds] // required for slash commands / basic bot operations
});

// Function to test Roblox cookie and debug
async function testRoblox() {
    try {
        // Attempt to log in to Roblox
        const currentUser = await noblox.setCookie(process.env.ROBLOX_COOKIE);
        console.log(`✅ Roblox login successful! Logged in as: ${currentUser.UserName} (${currentUser.UserId})`);
        return currentUser;
    } catch (err) {
        // Detailed error logging
        console.error("❌ Roblox login failed. Full error:");
        console.error(err);
        console.error("⚠ Make sure the ROBLOX_COOKIE is correct, includes the warning text, and the account has permissions in the group.");
        return null;
    }
}

// Function to log in Discord
async function startDiscord() {
    try {
        await client.login(process.env.DISCORD_TOKEN);
        console.log(`✅ Discord login successful as ${client.user.tag}`);
    } catch (err) {
        console.error("❌ Discord login failed. Full error:");
        console.error(err);
        console.error("⚠ Make sure DISCORD_TOKEN is correct and intents are enabled in the developer portal.");
    }
}

// Main start function
async function startBot() {
    console.log("🔹 Starting bot...");
    console.log("Node version:", process.version);

    // Test Roblox login
    const robloxUser = await testRoblox();
    if (!robloxUser) {
        console.warn("⚠ Roblox login failed. Bot will continue running but Roblox commands will not work until login is fixed.");
    }

    // Start Discord
    await startDiscord();
}

// Run the bot
startBot();

// Use clientReady event to avoid deprecation warning in discord.js v15+
client.once("clientReady", () => {
    console.log("Bot is online and ready!");
});
