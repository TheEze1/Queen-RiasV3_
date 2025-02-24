const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2347013938912",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUV5Sm83RFBiVkx3TDdWVEpLY2N6RGhnb2pnR1FGRDJNQ3dubmlENzhuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXFFdEVNcWFUTkVUQklHaUFEVGh2QWFyVDZiVnVRV2huZUpOamxvMjF3Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPQ0pTeXl6TXc2QUxuZnR0YXBNTzhqZUh6YzFBdmRaTWhGdnk0T1RJKzBZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFeHpuRFh3VzlKUHV5VzNwcVg3bGpLRDhtTkNZb0F1b3BnVU9xN0k5bkI4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFFZWg3bW92UEFDNFMrT2ppRzhwREVBdmpiZFhZcnJkQkZjQ3ZibFFxRlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZpYXE4L0dzeFBZTmtvK1YvRjMyaWZ0SlNaZEliQzg1QWxsZnVJREV5RU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBlRysyMVRqTlFRVENBb2d3QWQvTC9JN2VqK0svaXdUcG1hL0JrMjlGbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk54WU9sZ2svYW9qZ21LMzB3U0RuVnQ1SFhBVHVkRXBkNnA0OFhocVpDTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlmVzNkLythTDMzNkhVaGtqczhWM1JHTm9EL05pL1JSQmR2aTl4L1ZXUzlEclI5eUtzZFJ6cmZ5eTdZcVdiYnJEN2trS0dZYzhEcjdpN3dQakNyd2dRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY2LCJhZHZTZWNyZXRLZXkiOiJmWGRibVpEWlpWd1NKSzNmbVFSWFRFUlhvU2hwSU1ValBDNkxzbTkzRVlzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwMTM5Mzg5MTJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTZEMzg5QTdEQTYzNzVFNjM4RkQxMDk0RTgxQjAxQUQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MDM2MDcyOX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0NzAxMzkzODkxMkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCOTU4MkFFM0I4NjM0REU4OEI3RjdDQzE0NURDMkQxRCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQwMzYwNzI5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI5VkhGR0ZKWSIsIm1lIjp7ImlkIjoiMjM0NzAxMzkzODkxMjozQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkJBVE1BTiIsImxpZCI6IjIwNzkzMTc4MzE5MDM6M0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01HYjZQWUJFSW1ZNzcwR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImE3Z1Y5R0FEWnlvanBzMnZrQUo2VG05QnQzVFlDcyszZFJZVkd0bkxibFE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkZibEZ2Yy9MTy9Uc0RJMC92SGEyL0pTTENVdXpTNy80a2FjNEFtNXRZSk9JQVRqTXF0OVpqT25SY2xhOElkekVheUoxUWpmSllEWU5kQWJRVTl5U0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJDaWxwTGF6ZXdwbmgyblpZdlU0NzJTc1BrNXhHTExjZTdLdXJtT1B4QkpMTHZJNjdjZytMSGtiSnM0ZWhLRmlxVDNheTlON3JPVWhLY2hzaTErcFFqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwMTM5Mzg5MTI6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXdTRGZlJnQTJjcUk2Yk5yNUFDZWs1dlFiZDAyQXJQdDNVV0ZSclp5MjVVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDAzNjA3MjYsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTWxXIn0= || "",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
