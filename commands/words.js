const fs = require("fs");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, sql) => {
  let note = args.join(" ");
  if(message.mentions.users.size >= 1) return message.reply("خطأ بالأمر");
  if(note.length < 1) return message.reply("`الرجاء كتابة كلام بخاطرك`")
  if(note.length > 50) return message.reply("الرجاء كتابة كلام لا يزيد عن 50 حرف")

  let rows = sql.prepare(`SELECT * FROM about WHERE UserID = '${message.author.id}'`).get()
  let sqlstr;
  let age = rows.age;

  sqlstr = `UPDATE about SET words = "${note}" WHERE UserID = '${message.author.id}'`;
  sql.prepare(sqlstr).run()

  return message.reply("تم تحدث معلوماتك بنجاح").then(msg => {msg.delete(5000)});

}

module.exports.help = {
name:"klam"
}
