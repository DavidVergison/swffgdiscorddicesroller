import { RollResult } from './RollResult.js';

export class RollRequest {
    dicesResult = "";
    requestString = "";
    dices = {
        "d_blue": ["a","aa","as","s","",""],
        "d_black": ["t","tt","tf","f","",""],
        "d_purple": ["t","t","t","tt","f","ff","","ft"],
        "d_green": ["a","a","a","aa","s","ss","","sa"],
        "d_yellow": ["","as","as","aa","ss","s","T","ss","s","aa","as","a"],
        "d_red": ["","tf","tf","tt","ff","f","D","ff","f","tt","tf","t"],
        "d_white": ["d","d","d","d","d","d","l","l","ll","dd","ll","ll"]
      };

    constructor(requestString) {
        this.requestString = requestString;
    }

    roll(list, number) {
        let result = "";
        for(let i = 0; i < number; i++){
          result += list[Math.floor(Math.random() * list.length)];
        }
        return result;
    }

    numberOf(str, pattern) {
        let re = new RegExp(pattern, 'g');
        return (str.match(re) || []).length;
    }

    makeTheRoll(){
        Object.entries(this.dices).forEach(([color, values]) => {
          this.dicesResult += this.roll( values,   this.numberOf( this.requestString, color ));
        });
  
        let result = new RollResult();
    
        result.addAdvantage(
          this.numberOf(this.dicesResult, "a")
          -this.numberOf(this.dicesResult, "t")
        );
    
        result.addTriumph(
          this.numberOf(this.dicesResult, "T")
          -this.numberOf(this.dicesResult, "D")
        );
        
        result.addSuccess(
          this.numberOf(this.dicesResult, "s")
          -this.numberOf(this.dicesResult, "f")
        );
    
        result.addLightside(this.numberOf(this.dicesResult,"l"));
        result.addDarkside(this.numberOf(this.dicesResult,"d"));
  
        return result;
    }
}
