import { RollResult } from './RollResult.js';

export class RollRequest {
    dicesResult = "";
    requestString = "";
    dices = {
        "blue": ["a","aa","as","s","",""],
        "black": ["t","tt","tf","f","",""],
        "purple": ["t","t","t","tt","f","ff","","ft"],
        "green": ["a","a","a","aa","s","ss","","sa"],
        "yellow": ["","as","as","aa","ss","s","T","ss","s","aa","as","a"],
        "red": ["","tf","tf","tt","ff","f","D","ff","f","tt","tf","t"],
        "white": ["d","d","d","d","d","d","l","l","ll","dd","ll","ll"]
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
