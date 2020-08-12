module.exports = class Model {
    constructor(id
        , modelName
        , isEncrypted
        , isTrained
        , optimizer
        , trainingMethod
        , layers
        , biases
        , weights
        , activations
        , regularization
        , learningRate
        , epochs) {
        this.id =id;
        this.modelName = modelName;
        this.isEncrypted = isEncrypted;
        this.isTrained = isTrained;
        this.optimizer = optimizer;
        this.trainingMethod = trainingMethod;
        this.layers = layers;
        this.biases = biases;
        this.weights = weights;
        this.activations = activations;
        this.regularization = regularization;
        this.learningRate = learningRate;
        this.epochs = epochs;
    }
}