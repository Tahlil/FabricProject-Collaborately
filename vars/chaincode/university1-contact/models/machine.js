module.exports = class Dataset {
    constructor(
        id,
        manufacturer,
        model,
        version,
        osType,
        osVersion,
        architecture,
        cpuAndStorageInfo,
        gpuInfo
    ) {
        this.id =id;
        this.manufacturer = manufacturer;
        this.model = model;
        this.version = version;
        this.osType = osType;
        this.osVersion = osVersion;
        this.architecture = architecture;
        this.cpuAndStorageInfo = cpuAndStorageInfo;
        this.gpuInfo = gpuInfo;
    }
}