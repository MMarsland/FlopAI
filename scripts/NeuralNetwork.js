class NeuralNetwork {
  constructor(inputsNum, hidNum, outputsNum) {
    //Arguments in the form (#inputs, #1st hidden layer nodes, #2nd hidden layer nodes, outputs)
    // Ging to first try 2 -> 2 -> 1
    this.wIH = new Matrix(hidNum, inputsNum);
    this.wHO = new Matrix(outputsNum, hidNum);

    this.bH = new Matrix(hidNum,1);
    this.bO = new Matrix(outputsNum,1);

    this.wIH.randomize();
    this.wHO.randomize();

    this.bH.zero();
    this.bO.zero();

    this.lr = 0.1;
  }

  feedForward(inputs) {
    let weights_IH = this.wIH.getCopy();
    let bias_H = this.bH.getCopy();
    let hidden = weights_IH.getMultiply(inputs);
    hidden.add(bias_H);
    hidden.map(System.sigmoid);
    // Now actual Hidden
    let weights_HO = this.wHO.getCopy();
    let bias_O = this.bO.getCopy();
    let outputs = weights_HO.getMultiply(hidden);
    outputs.add(bias_O);
    outputs.map(System.sigmoid);

    return outputs;
  }

  train(inputs, targets) {
    let weights_IH = this.wIH.getCopy();
    let bias_H = this.bH.getCopy();
    let hiddens = weights_IH.getMultiply(inputs);
    hiddens.add(bias_H);
    hiddens.map(System.sigmoid);
    // Now actual Hidden
    let weights_HO = this.wHO.getCopy();
    let bias_O = this.bO.getCopy();
    let outputs = weights_HO.getMultiply(hiddens);
    outputs.add(bias_O);
    outputs.map(System.sigmoid);
    // Now actual Outputs

    // TRAIN IT!
    let errors_O = targets.getCopy();
    errors_O.subtract(outputs);
    let wHO_trans = weights_HO.getTranspose();
    let errors_H = wHO_trans.getMultiply(errors_O);
    // Everything preserved so far!

    //Get Changes
    let gradient_HO = outputs.getCopy();
    gradient_HO.map(System.dsigmoid);
    gradient_HO.dot(errors_O);
    gradient_HO.scalar(this.lr);
    let hiddens_trans = hiddens.getTranspose();
    let delta_weights_HO = gradient_HO.getMultiply(hiddens_trans);

    let gradient_IH = hiddens.getCopy();
    gradient_IH.map(System.dsigmoid);
    gradient_IH.dot(errors_H);
    gradient_IH.scalar(this.lr);
    let inputs_trans = inputs.getTranspose();
    let delta_weights_IH = gradient_IH.getMultiply(inputs_trans);

    let delta_bias_O = gradient_HO.getCopy();
    let delta_bias_H = gradient_IH.getCopy();

    this.wHO.add(delta_weights_HO);
    this.wIH.add(delta_weights_IH);
    this.bH.add(delta_bias_H);
    this.bO.add(delta_bias_O);
  }
}
