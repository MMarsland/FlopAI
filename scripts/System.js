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

  static readFile(inputId, callback) {
    let input = document.getElementById(inputId);
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          callback(reader.result);
        };
        reader.readAsText(input.files[0]);
    }
  }

  static getTabbedText(indentation, text) {
    let addTextList = text.split("\n");
    let tabs = "";
    let newText = "";
    for (let i=0;i<addTextList.length;i++) {
      tabs = "";
      for (let j=0;j<indentation;j++) {
        tabs += "  "; //The best indentation distance is two spaces. FACT.
      }
      newText += tabs + addTextList[i] + "\r\n";
    }
    return newText;
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

  static multiplyMatrices(m1, m2) {
    console.log("MULTIPLYING:");
    console.log(m1);
    console.log(m2);
    var result = [];
    let sum;
    for (let i=0;i<m1.length;i++) {
      sum = 0;
      for(let j=0;j<m1[i].length;j++) {
        sum += m2[j]*m1[i][j];
      }
      result[i] = sum;
    }
    console.log("RESULT:");
    console.log(result);
    return result;
  }

  static addMatrices(a, b){
    console.log("ADDING:");
    console.log(a);
    console.log(b);
    let result = [];
    for (let i=0;i<a.length;i++) {
      result[i] = a[i]*1 + b[i]*1;
    }
    console.log("RESULT:");
    console.log(result);
    return result;
  }

  static sigmoid(x) {
    // 1 / (1 + e^-x)
    return (1 / (1 + (Math.E ** (-x))));
  }

  static dsigmoid(y) {
    return y * (1 - y);
  }

  static tanh(x) {
    //(e^(2z)-1)/(e^(2z)+1),
    return ((Math.E**(2*x)-1)/(Math.E**(2*x)+1));
  }
}
