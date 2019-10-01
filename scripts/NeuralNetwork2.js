class NeuralNetwork {
  constructor(inputsNum, hid1Num, /*hid2Num,*/ outputsNum) {
    //Arguments in the form (#inputs, #1st hidden layer nodes, #2nd hidden layer nodes, outputs)
    // Ging to first try 100 -> 36 -> 12 -> 4
    this.wI1 = new Matrix(hid1Num, inputsNum);
    //this.w12 = new Matrix(hid2Num, hid1Num);
    this.w2O = new Matrix(outputsNum, hid1Num);

    this.bI1 = new Matrix(hid1Num,1);
    //this.b12 = new Matrix(hid2Num,1);
    this.b2O = new Matrix(outputsNum,1);

    this.wI1.randomize();
    //this.w12.randomize();
    this.w2O.randomize();

    this.bI1.randomize();
    //this.b12.randomize();
    this.b2O.randomize();

    this.lr = 0.1;
  }

  feedForward(inputs) {

    let hidden1 = Matrix.multiply(this.wI1, inputs);
    hidden1.add(this.bI1);
    hidden1.map(System.sigmoid);

    //let hidden2 = Matrix.multiply(this.w12, hidden1);
    //hidden2.add(this.b12);
    //hidden2.map(System.sigmoid);

    let outputs = Matrix.multiply(this.w2O, hidden1);
    outputs.add(this.b2O);
    outputs.map(System.sigmoid);

    return outputs;
  }

  train(inputs, targets) {
    // Feed Forward
    console.log("HERE");
    let hidden1 = Matrix.multiply(this.wI1, inputs);
    hidden1.add(this.bI1);
    hidden1.map(System.sigmoid);
    hidden1.print();
    //let hidden2 = Matrix.multiply(this.w12, hidden1);
    //hidden2.add(this.b12);
    //hidden2.map(System.sigmoid);

    let outputs = Matrix.multiply(this.w2O, hidden1);
    outputs.add(this.b2O);

    outputs.map(System.sigmoid);
    outputs.print();

    // Back Propagate
    let errorO = Matrix.subtract(targets, outputs);
    errorO.map((x) => (x^2));
    //let error2 = Matrix.multiply(Matrix.transpose(this.w2O), errorO);
    let error1 = Matrix.multiply(Matrix.transpose(this.w2O), errorO);
    error1.map((x) => (x^2));

    let gradientO = Matrix.map(outputs, System.dsigmoid);
    gradientO.dot(errorO);
    gradientO.scalar(this.lr);
    let deltas2O = Matrix.multiply(gradientO, Matrix.transpose(hidden1));
    this.w2O.add(deltas2O);
    this.b2O.add(gradientO);
    this.w2O.print();
    this.b2O.print();


    //let gradient2 = Matrix.map(hidden2, System.dsigmoid);
    //gradient2.dot(error2);
    //gradient2.scalar(this.lr);
    //let deltas12 = Matrix.multiply(gradient2, Matrix.transpose(hidden1));
    //this.w12.add(deltas12);
    //this.b12.add(gradient2);

    let gradient1 = Matrix.map(hidden1, System.dsigmoid);
    gradient1.dot(error1);
    gradient1.scalar(this.lr);
    let deltasI1 = Matrix.multiply(gradient1, Matrix.transpose(inputs));
    this.wI1.add(deltasI1);
    this.bI1.add(gradient1);
    this.wI1.print();
    this.bI1.print();

  }
}
