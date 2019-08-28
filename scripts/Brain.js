class Brain {
  constructor() {
    // Gonna Start with 100 inputs, 64, 32, 16, 8, 4 Outputs
    this.biases = [];
    this.wirings = [];
    this.outputs;
    this.randomizeBrain();
  }

  randomizeBrain(){
    let numWirings = 100 * 8 + 8 * 4;
    let numbiases = 8 + 4;
    for (let i = 0; i<numWirings;i++) {
      this.wirings[i] = getRandPMNormal();
    }
    for (let i=0;i<numbiases;i++) {
      this.biases[i] = getRandPMNormal();
    }
  }

  saveBrain() {
    let brainText = "Brain:\n";
    brainText += "Neurons:\n[";
    for (let i=0; i<this.biases.length;i++){
      brainText += this.biases[i] + "";
      brainText += (i == this.biases.length-1)? "]\n" : ",";
    }
    brainText += "Wirings:\n[";
    for (let i=0; i<this.wirings.length;i++){
      brainText += this.wirings[i] + "";
      brainText += (i == this.wirings.length-1)? "]" : ",";
    }
    download("Brain", brainText);
  }

  encodeBrain(text) {
    let neuronText = text.substring(text.indexOf("[")+1, text.indexOf("]"));
    let remainderText = text.substring(text.indexOf("Wirings:"));
    let wiringsText = remainderText.substring(remainderText.indexOf("[")+1, remainderText.indexOf("]"));

    //Add Neurons to Col1
    let neuronVals = neuronText.split(",");
    for (let i=0;i<neuronVals.length;i++){
      this.biases[i] = neuronVals[i];
    }
    let wiringsVals = wiringsText.split(",");
    for (let i=0;i<wiringsVals.length;i++){
      this.wirings[i] = wiringsVals[i];
    }
    console.log("Brain Uploaded");
  }

  getOutputs(inputs) {
    // Input length = 100
    // Create Wirings Matrix
    // 100 by 8
    let firstWiringsMatrix = [];
    for (let i=0;i<8;i++) {
      firstWiringsMatrix[i] = [];
    }
    for (let i=0;i<8;i++) {
      for (let j=0;j<100;j++) {
        firstWiringsMatrix[i][j] = this.wirings[(i*100+j)];
      }
    }

    //console.log("firstWiringsMatrix:");
    //console.log(firstWiringsMatrix);

    let inputMatrix = [];
    // Create Inputs Matrix
    for (let i=0; i<100; i++){
      inputMatrix[i] = tanh(inputs[i]);
    }

    //Create Bias Matrix
    let firstBiasMatrix = [];
    // Create Inputs Matrix
    for (let i=0; i<8; i++){
      firstBiasMatrix[i] = this.biases[i];
    }
    //console.log("firstBiasMatrix:");
    //console.log(firstBiasMatrix);
    // Calculate hidden layer 1 values
    let hiddenLayer1Matrix = [];
    hiddenLayer1Matrix = tanhMatrix(addMatrices(multiplyMatrices(firstWiringsMatrix, inputMatrix), firstBiasMatrix));
    console.log("hiddenLayer1Matrix:");
    console.log(hiddenLayer1Matrix);
    console.log("First Value:");
    let firstVal = 0;
    for (let i=0; i<100;i++){
      firstVal += inputs[i]*firstWiringsMatrix[0][i];
    }
    firstVal += firstBiasMatrix[0];
    console.log(tanh(firstVal));
    // Calculate Output layer
    // Find Second Wirings and Second Bias Matrices
    let secondWiringsMatrix = [];
    for (let i=0;i<4;i++) {
      secondWiringsMatrix[i] = [];
    }
    for (let i=0;i<4;i++) {
      for (let j=0;j<8;j++) {
        secondWiringsMatrix[i][j] = this.wirings[(800 + (i*8+j))];
      }
    }
    //console.log("secondWiringsMatrix:");
    //console.log(secondWiringsMatrix);

    //Create Bias Matrix
    let secondBiasMatrix = [];
    // Create Inputs Matrix
    for (let i=0; i<4; i++){
      secondBiasMatrix[i] = this.biases[(8 + i)];
    }
    //console.log("secondBiasMatrix:");
    //console.log(secondBiasMatrix);
    // Calculate output layer values
    let outputMatrix = [];
    outputMatrix = sigmoidMatrix(addMatrices(multiplyMatrices(secondWiringsMatrix, hiddenLayer1Matrix), secondBiasMatrix));
    console.log("outputMatrix:");
    console.log(outputMatrix);
    console.log(Math.max(...outputMatrix));
    //find Direction
    return outputMatrix;
  }

  getMove(outputs) {
    let max = Math.max(...outputs);
    let index = outputs.indexOf(max);
    if (index == 0) {
      return "N";
    } else if (index == 1) {
      return "E";
    } else if (index == 2) {
      return "S";
    } else if (index == 3) {
      return "W";
    } else {
      alert("ERROR (Index)");
    }
  }
}

function multiplyMatrices(m1, m2) {
  var result = [];
  let sum;
  for (let i=0;i<m1.length;i++) {
    sum = 0;
    for(let j=0;j<m1[i].length;j++) {
      sum += m2[j]*m1[i][j];
    }
    result[i] = sum;
  }
  return result;
}

function addMatrices(a, b){
  let result = [];
  for (let i=0;i<a.length;i++) {
    result[i] = a[i] + b[i];
  }
  return result;
}

function sigmoid(x) {
  // 1 / (1 + e^-x)
  return (1 / (1 + Math.E ** (-x)));
}

function sigmoidMatrix(matrix) {
  let newMatrix = [];
  for (let i=0;i<matrix.length;i++){
    newMatrix[i] = sigmoid(matrix[i]);
  }
  return newMatrix;
}

function tanh(x) {
  //(e^(2z)-1)/(e^(2z)+1),
  return ((Math.E**(2*x)-1)/(Math.E**(2*x)+1));
}

function tanhMatrix(matrix) {
  let newMatrix = [];
  for (let i=0;i<matrix.length;i++){
    newMatrix[i] = tanh(matrix[i]);
  }
  return newMatrix;
}

function getInputs() {
  let mapArray = getMapArray();
  let inputsMatrix = [];
  for (let i=0;i<10;i++) {
    for (let j=0;j<10;j++) {
      inputsMatrix[(i*10+j)] = mapArray[i][j];
    }
  }
  console.log("InputsMatrix:");
  console.log(inputsMatrix);
  return inputsMatrix;
}

function testBrain() {
  console.log("Testing Brain");
  console.log("Chosen Move: "+brain.getMove(brain.getOutputs(getInputs())));
}
