const { Client, GatewayIntentBits } = require("discord.js");
const noblox = require("noblox.js");

// Discord client with just the intents you need
const client = new Client({
    intents: [GatewayIntentBits.Guilds] // only required intent for slash commands
});

// Async start function
async function start() {
    // Roblox login
    try {
        await noblox.setCookie(process.env.ROBLOX_COOKIE);
        console.log("✅ Logged into Roblox");
    } catch (err) {
        console.error("❌ Failed to log into Roblox. Make sure your ROBLOX_COOKIE is correct:", err.message);
    }

    // Discord login
    try {
        await client.login(process.env.DISCORD_TOKEN);
        console.log(`✅ Logged into Discord as ${client.user.tag}`);
    } catch (err) {
        console.error("❌ Failed to log into Discord. Check your DISCORD_TOKEN and intents:", err.message);
    }
}

// Start bot
start();

client.once("ready", () => {
    console.log("Bot is online and ready!");
});
