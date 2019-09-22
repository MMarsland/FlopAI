class System {

  // Generic Methods
  static download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
  }

  static readFile(inputId) {
    let input = document.getElementById(inputId);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = () => {
          return reader.result;
        };
        reader.readAsText(input.files[0]);
    }
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static getRandInt(min, max) {
      let realMax = max+1;
      let random = (Math.floor(Math.random() * (realMax-min)) + min);
      return random;
  }

  static getRandPMNormal() {
    let random = (Math.random()*2 - 1);
    return random;
  }

  static getRandNormal() {
    let random = (Math.random());
    return random;
  }

  static copy1DArray(array) {
    let temp = [];
    for (let i=0;i<array.length;i++){
      temp[i] = array[i];
    }
    return temp;
  }

  static getRandomName() {
    let nameKey = System.getRandInt(0, namesList.length-1);
    return namesList[nameKey];
  }

  static getRandomTrait() {
    let adjectiveKey = System.getRandInt(0, adjectivesList.length-1);
    let adj = adjectivesList[adjectiveKey]
    return adj.charAt(0).toUpperCase() + adj.slice(1);
  }

  static getRandomTraitsText() {
    let numTraits = System.getRandInt(1,3);
    let traits = "";
    for (let i=0;i<numTraits;i++) {
      traits += System.getRandomTrait() + ", ";
    }
    return traits.substring(0, traits.length-2);
  }
}
