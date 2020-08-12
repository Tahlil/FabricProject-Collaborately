module.exports = class Dataset {
    constructor(
        id,
    fileName,
    fileType,
    fileSize,
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
        this.fileSize = fileSize;
        this.datasetName = datasetName;
        this.description = description;
        this.columns = columns;
        this.columnTypes = columnTypes;
        this.numberOfRow = numberOfRow;
        this.isPrivate = isPrivate;
    }
}
