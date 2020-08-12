module.exports = class Dataset {
    constructor(
        datasetIds,
        modelId,
        machinIds,
        accuracy,
        traininTime,
        dataEncryted,
        modelEncrypted
    ) {
        this.datasetIds =datasetIds;
        this.modelId = modelId;
        this.machinIds = machinIds;
        this.accuracy = accuracy;
        this.traininTime = traininTime;
        this.dataEncryted = dataEncryted;
        this.modelEncrypted = modelEncrypted;
    }
}