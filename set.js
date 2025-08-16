const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0VOTFVpR3ZMdEg3SkwvSnBkWUpsRXhXaEgwd2t0OU9mNjZpWTZ0dTNXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUXRWV3d3dDZWNUprcXJESXg5eTdUMmtDbEQyVm5NRHlQUFJFZklTMGoxND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RWFpbVB4YzUvSTluVnAzT09kZlhPUkhLV3VuYTIxVjMzYU5Ta0tRZzBrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDa2pocVVVS1pLVlFrTFpnTDRXemMyb0NMcUNDV0EzSHc3aldldEhOdGg0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVIc0w2c0tlUUN0ZFkxSmJDSkVLUElmajJ3c3JQTXJpdlNKUG9pMWM1MUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVyVy92cXlCUHlGTkRndFJHdlRXenRGbkUxL25qMm1xQ0RFRWpQTGtDaWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUwzanFkWGlSTFp3a0ZWc2VSSWsydlFBL2hNdHF0Ukhwc01lRzRMaUkzOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV3lBNWcvTXhacmlySGI5YXJQNGw0TWYybkk5VU1nUHgyOWZQQW53UEJ4VT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik43YkVqSzBLVFZGSzVBem1JTmdDb3hiUVNwdEtHWGVCbnFWVXNLYlVNbU9kT0JCTkEzRkZwN2QvVFpJb1NUR0dnSldMT0hHZFhMc2E1MXlvZnRGa0RBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NCwiYWR2U2VjcmV0S2V5IjoiOFJhbXpkRnJFc3FCTXROUWU4MWx2TFpZeDFmQmlFampuM0Z6VnlTMHhqcz0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiI5MTk1MzkxODIxNDhAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTI1Nzk3QkRERkU2NTVGMkJGNzU3QjRBODBDNjM1MEIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NTMxODczMH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiS1dETTY5S00iLCJtZSI6eyJpZCI6IjkxOTUzOTE4MjE0ODo1QHMud2hhdHNhcHAubmV0IiwibGlkIjoiODg3NDMxMTc2MzE1NjU6NUBsaWQiLCJuYW1lIjoi4aWK6quA6qqA6qqu6qqR6qqu8J2Ys8+B6qud8J+Ng/CfpI0ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09ucy90SUZFTFdUZ01VR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImtoNks3SlY1RFY2KzRXU3VTNWhoNnlYSHZYRTM1eGoxZ3dWdmx1SHpoeUU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlZCc29aL2ovcjh6Mmk5Q3I1c0dlTGI3MzE1QnV4anhKNVowZVNnU2xkYUVXM3p4WnNqd3UwYXZVbXl1VFlVREh6bDBHS0JoZ0F2Wnl2WXZJWHdqK0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4UGh2ZFJDdysvOEJHTGx5L0UwVzZrTGNkM09sWHNFVDI2aG1UN2FkdDAwa0xhekJ0c3pEdUhPWldqMWxDQ0hxckpqSmxpMWZiMCs5RjBwQmo1SStBQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxOTUzOTE4MjE0ODo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlpJZWl1eVZlUTFldnVGa3JrdVlZZXNseDcxeE4rY1k5WU1GYjViaDg0Y2gifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1NTMxODcyMiwibGFzdFByb3BIYXNoIjoiM2ZZd0NLIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNZjIifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/toxiclover-tech/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "toxic lover",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254717263689",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "yes",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by JEEPERS CREEPER-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧JEEPERS CREEPER-XMD✧",
    BOT : process.env.BOT_NAME || '✧JEEPERS CREEPER-XMD TECH✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
