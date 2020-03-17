import { RollRequest } from './modules/RollRequest.js';
import * as Discord from 'discord.js'

const client = new Discord.default.Client();
var emojis = true;

client.on('ready', () => {
  console.log("Logged in as ${client.user.tag}!");
});

function loadEmoji(list){
  emojis = {success:"", failure:"", triumph_:"", despair:"", advantage:"", threat:"",lightside:"",darkside:""}

  list.forEach((code, id) => {
    console.log(code['name']);
    if(code['name'] in emojis){
      emojis[code['name']] = `<:${code['name']}:${id}>`;
    }
  });
  console.log(emojis);
}

client.on('message', msg => {
  if (msg.content === "!D"){

    msg.reply(
      `les dés disponibles sont les suivants :
      :d_green: dé d'aptitude
      :d_yellow: dé de maitrise
      :d_blue: dé de fortune
      :d_white: dé de force
      :d_purple: dé de difficulté
      :d_red: dé de défi
      :d_black: dé d'infortune

      exemple :
      !D:d_green::d_green::d_yellow::d_blue::d_purple::d_purple:
      `
    );
  } else if (msg.content.startsWith("!D")){

    if (emojis){
      console.log(msg.channel.guild.emojis.caches);
      loadEmoji(msg.channel.guild.emojis.cache);
    }

    let requestedRoll = new RollRequest(msg.content);

    msg.reply(
      requestedRoll.makeTheRoll().toString(emojis)
    );
  }
});

client.login(process.env.TOKEN);
