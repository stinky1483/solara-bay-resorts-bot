require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const noblox = require("noblox.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

async function start() {
    try {
        await noblox.setCookie(process.env.ROBLOX_COOKIE);
        console.log("✅ Logged into Roblox");
    } catch (err) {
        console.error("❌ Failed to log into Roblox:", err);
    }

    try {
        await client.login(process.env.DISCORD_TOKEN);
        console.log(`✅ Logged into Discord as ${client.user.tag}`);
    } catch (err) {
        console.error("❌ Failed to log into Discord:", err);
    }
}

start();

// Ready event
client.once("ready", () => {
    console.log("Bot is online and ready!");
});
