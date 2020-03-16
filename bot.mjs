import { RollRequest } from './modules/RollRequest.js';
import * as Discord from 'discord.js'

const client = new Discord.default.Client();

client.on('ready', () => {
  console.log("Logged in as ${client.user.tag}!");
});

client.on('message', msg => {
  if (msg.content === "!D"){
    msg.reply(
      `les dés disponibles sont les suivants :
      :green: dé d'aptitude
      :yellow: dé de maitrise
      :blue: dé de fortune
      :white: dé de force
      :purple: dé de difficulté
      :red: dé de défi
      :black: dé d'infortune

      exemple :
      !D:green::green::yellow::blue::purple::purple:
      `
    );
  } else if (msg.content.startsWith("!D")){
    let requestedRoll = new RollRequest(msg.content);

    msg.reply(
      requestedRoll.makeTheRoll().toString()
    );
  }
});

client.login(process.env.TOKEN);
