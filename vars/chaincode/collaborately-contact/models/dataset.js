module.exports = class Dataset {
    constructor(
        id,
    fileName,
    fileType,
    datasetName,
    description,
    columns,
    columnTypes,
    numberOfRow,
    isPrivate,
    ) {
        this.id =id;
        this.fileName = fileName;
        this.fileType = fileType;
        this.datasetName = datasetName;
        this.description = description;
        this.columns = columns;
        this.columnTypes = columnTypes;
        this.numberOfRow = numberOfRow;
        this.isPrivate = isPrivate;
    }
}
