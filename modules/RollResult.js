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
    if (this.triumphDespair > 0) result += emojis["s_triumph"].repeat(this.triumphDespair); 
    if (this.triumphDespair < 0) result += emojis["s_despair"].repeat(-this.triumphDespair); 
    if (this.successFailure > 0) result += emojis["s_success"].repeat(this.successFailure); 
    if (this.successFailure < 0) result += emojis["s_failure"].repeat(-this.successFailure); 
    if (this.advantageThreat > 0) result += emojis["s_advantage"].repeat(this.advantageThreat); 
    if (this.advantageThreat < 0) result += emojis["s_threat"].repeat(-this.advantageThreat); 
    if (this.lightside > 0) result += emojis["s_lightside"].repeat(this.lightside); 
    if (this.darkside > 0) result += emojis["s_darkside"].repeat(this.darkside); 

    if (result === "\n"){
      return "Aucun symbole (ou symboles entre-annulés)";
    }
    return result;
  }
}
