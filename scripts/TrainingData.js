class TrainingData {
  constructor() {
    this.trainingData = [];
  }

  add(inputs, outputs) {
    let item = new DataObject(inputs, outputs);
    this.trainingData.push(item);
  }
}

class DataObject {
  constructor() {
    this.inputs;
    this.outputs;
  }
}
