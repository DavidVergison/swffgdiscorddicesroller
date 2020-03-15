const Discord = require('discord.js');
const client = new Discord.Client();

const port = process.env.TOKEN;

client.on('ready', () => {
  console.log("Logged in as ${client.user.tag}!");
});

dices = {
  "blue": ["a","aa","as","s","",""],
  "black": ["t","tt","tf","f","",""],
  "purple": ["t","t","t","tt","f","ff","","ft"],
  "green": ["a","a","a","aa","s","ss","","sa"],
  "yellow": ["","as","as","aa","ss","s","T","ss","s","aa","as","a"],
  "red": ["","tf","tf","tt","ff","f","D","ff","f","tt","tf","t"],
  "white": ["d","d","d","d","d","d","l","l","ll","dd","ll","ll"]
};

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

    roll_result = {
      success_failure: 0,
      triumph_despair: 0,
      advantage_threat: 0,
      lightside: 0,
      darkside: 0,
      
      addSuccess: function(number) {
        this.success_failure += number;
      },
      addTriumph: function(number) {
        this.triumph_despair += number;
      },
      addAdvantage: function(number) {
        this.advantage_threat += number;
      },
      addLightside: function(number) {
        this.lightside += number;
      },
      addDarkside: function(number) {
        this.darkside += number;
      },
      toString: function() {
        result = "\n";
        if (this.success_failure > 0) { result += this.success_failure + " réussite(s)\n"; }
        if (this.success_failure < 0) { result += -this.success_failure + " échec(s)\n"; }
        if (this.triumph_despair > 0) { result += this.triumph_despair + " triomphe(s)\n"; }
        if (this.triumph_despair < 0) { result += -this.triumph_despair + " desespoir(s)\n"; }
        if (this.advantage_threat > 0) { result += this.advantage_threat + " avantage(s)\n"; }
        if (this.advantage_threat < 0) { result += -this.advantage_threat + " menace(s)\n"; }
        if (this.lightside > 0) { result += this.lightside + " côté(s) lumineux\n"; }
        if (this.darkside > 0) { result += this.darkside + " côté(s) obscur\n"; }
        if (result === "\n"){
          return "Aucun symbole (ou symboles entre-annulés)";
        }
        return result;
      }
    };

    requestedRoll = {
      dices_result: "",
      request: "",
      init: function(message){
        this.request = message;
        return this;
      },
      roll: function(list, number){
        result = "";
        for(i = 0; i < number; i++){
          result += list[Math.floor(Math.random() * list.length)];
        }
        return result;
      },
      numberOf: function(str, pattern){
        var re = new RegExp(pattern, 'g');
        return (str.match(re) || []).length;
      },
      makeTheRoll: function(){
        Object.entries(dices).forEach(([color, values]) => {
          this.dices_result += this.roll( values,   this.numberOf( this.request, color ));
        });

        result = Object.create(roll_result);
    
        result.addAdvantage(
          this.numberOf(this.dices_result, "a")
          -this.numberOf(this.dices_result, "t")
        );
    
        result.addTriumph(
          this.numberOf(this.dices_result, "T")
          -this.numberOf(this.dices_result, "D")
        );
        
        result.addSuccess(
          this.numberOf(this.dices_result, "s")
          -this.numberOf(this.dices_result, "f")
        );
    
        result.addLightside(this.numberOf(this.dices_result,"l"));
        result.addDarkside(this.numberOf(this.dices_result,"d"));

        return result;
      }
    };

    msg.reply(
      requestedRoll.init(msg.content).makeTheRoll().toString()
    );
  }
});

client.login(process.env.TOKEN);
//client.login("Njg4MjkxNzgyMzM2ODM5Njgw.Xm0oIA.trlG-YAZsZ-HQeILS529sDRCwOM");
