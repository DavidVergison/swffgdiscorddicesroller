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

  toString() {
    let result = "\n";
    if (this.successFailure > 0) { result += this.successFailure + " réussite(s)\n"; }
    if (this.successFailure < 0) { result += -this.successFailure + " échec(s)\n"; }
    if (this.triumphDespair > 0) { result += this.triumphDespair + " triomphe(s)\n"; }
    if (this.triumphDespair < 0) { result += -this.triumphDespair + " desespoir(s)\n"; }
    if (this.advantageThreat > 0) { result += this.advantageThreat + " avantage(s)\n"; }
    if (this.advantageThreat < 0) { result += -this.advantageThreat + " menace(s)\n"; }
    if (this.lightside > 0) { result += this.lightside + " côté(s) lumineux\n"; }
    if (this.darkside > 0) { result += this.darkside + " côté(s) obscur\n"; }
    if (result === "\n"){
      return "Aucun symbole (ou symboles entre-annulés)";
    }
    return result;
  }
}
