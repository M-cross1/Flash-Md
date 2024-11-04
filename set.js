const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUV1czhtVW5vUWtnTW8rdFpNM0ZxZW8zNTJBNVJaMmp4N21xYVo0ME1HVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTFVGQjF2Znk1d2RLZW41cXNPdnAxYWxVaEhLMmRIcGVwN2hXdVA5VDJ4ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTmt2NVhnRWlKbi9wcFNOMWkzYzMvTk42TDR3MEtKYkVHSkZTckk4ZzFRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJheVdkV1RRem5MYmN0SENUemhvSlQzeUxFVDNaS3dEa3dvUEJaVVpXN2xjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNNWEhYZXQrelhmbHVMQ0lYR3RMNGtGQ1ZCNTdsV0RyeDU2ZUJ1aTQzMGM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJBYkYwTk15R3VrNjVVdjdtN3dITmhuT2Zoc1V5MmhDKzVFVnY2anYwU3M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUJPQ0w1d1ZvbVdwcE9EanVDeXZhZ1k3ZklhdzBPU1lUR2plSlcrVGlGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMnlLOUh3Y2JBOVVjd0N0WGtMb2Q0amtWWmVhSmFvcW11dzBUbVVBYUtVRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVwbEx6bER2L00vUzNBbW1PUmlQMTMrdVpXaWpIdUxNYUt3c1czYk5HeHd5UVorTG8rREFFMjdJWlpZblFCODNTSmVXK2cyQXo0TzhCbGd5VE9ycGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzgsImFkdlNlY3JldEtleSI6IjIyWjBSUEdRMm9PYVZCQVQ1U0J1RWFFUDBuSmNkdEgvR1FBQnJzK0gydTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjhWUk1uRGVIUzRTRUpRbXcxOThOQWciLCJwaG9uZUlkIjoiYmYwM2NmM2QtNDM1Mi00YTQ0LTlmN2EtODgyMTQ4MDFkYjMxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFURktoeWRkWStEMVEyRlYzODQ1aXZRR3Vrdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzamY2dXVCLzJIelBNcmtoOVFmd3ZFc0pmbkk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSjNBUUozUTgiLCJtZSI6eyJpZCI6IjIzNDgxNjU5NDY5OTM6MzBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi54iq5Lio5bC65Y2C5Yya44Sl5LmHwq4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0syanJKUUZFTG14cExrR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik10TTZLY3FQdDFUOUxqNWJ3UTZpUHd2SENwZnhBb3h5WTBaWTlKNkpISEE9IiwiYWNjb3VudFNpZ25hdHVyZSI6InRnZC9xai9aRk9kVUcwWHJRN0RlUDlkSDB0bm5EeGlnejNrZ2VJT2FISnBOb1VWbU1VUWJrRi9zUmNOU1huTzdLQ1NERWxhazlaZFVNM2ZtNXB3amdnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJOY1l1bG9GREMzVWo1NEZHaTBmdGhLZG9xSlNRQ1o5STRWcHhlOXM3S2UzeEpQN2E2M2RUeUxMczNhd0R1QlRhajQ2SWU5Z0FpL21mTEhKT2RxOEpqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxNjU5NDY5OTM6MzBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVExUT2luS2o3ZFUvUzQrVzhFT29qOEx4d3FYOFFLTWNtTkdXUFNlaVJ4dyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMwNzQ2NTY2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdIaSJ9',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "SADIPS☠️❤️",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2347049602299",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'off',
    TZ: process.env.TIME_ZONE || 'Africa/Lagos',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
