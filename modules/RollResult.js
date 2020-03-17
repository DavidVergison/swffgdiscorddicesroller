export class RollResult {
  successFailure = 0;
  triumphDespair = 0;
  advantageThreat = 0;
  lightside = 0;
  darkside = 0;

  addSuccess(number) {
    this.successFailure += number;
  }

  addTriumph(number) {
    this.triumphDespair += number;
  }

  addAdvantage(number) {
    this.advantageThreat += number;
  }

  addLightside(number) {
    this.lightside += number;
  }

  addDarkside(number) {
    this.darkside += number;
  }

  toString(emojis) {
    let result = "\n";
    if (this.triumphDespair > 0) result += emojis["triumph_"].repeat(this.triumphDespair); 
    if (this.triumphDespair < 0) result += emojis["despair"].repeat(-this.triumphDespair); 
    if (this.successFailure > 0) result += emojis["success"].repeat(this.successFailure); 
    if (this.successFailure < 0) result += emojis["failure"].repeat(-this.successFailure); 
    if (this.advantageThreat > 0) result += emojis["advantage"].repeat(this.advantageThreat); 
    if (this.advantageThreat < 0) result += emojis["threat"].repeat(-this.advantageThreat); 
    if (this.lightside > 0) result += emojis["lightside"].repeat(this.lightside); 
    if (this.darkside > 0) result += emojis["darkside"].repeat(this.darkside); 

    if (result === "\n"){
      return "Aucun symbole (ou symboles entre-annulés)";
    }
    return result;
  }
}
