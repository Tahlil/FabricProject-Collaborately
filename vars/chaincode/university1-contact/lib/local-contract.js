/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class ModelContract extends Contract {

    async modelExists(ctx, modelId) {
        const buffer = await ctx.stub.getState(modelId);
        return (!!buffer && buffer.length > 0);
        
    }

 
    async createModel(ctx, modelId, value) {
        const exists = await this.modelExists(ctx, modelId);
        if (exists) {
            throw new Error(`The model ${modelId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(modelId, buffer);
    }

    async readModel(ctx, modelId) {
        const exists = await this.modelExists(ctx, modelId);
        if (!exists) {
            throw new Error(`The model ${modelId} does not exist`);
        }
        const buffer = await ctx.stub.getState(modelId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async publishUpdateModel(ctx, modelId, newValue) {
        const exists = await this.modelExists(ctx, modelId);
        if (!exists) {
            throw new Error(`The model ${modelId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(modelId, buffer);
    }

    async deleteModel(ctx, modelId) {
        const exists = await this.modelExists(ctx, modelId);
        if (!exists) {
            throw new Error(`The model ${modelId} does not exist`);
        }
        await ctx.stub.deleteState(modelId);
    }

    async createDataset(ctx, modelId) {
       
    }

    async deleteDataset(ctx, modelId) {
       
    }
    async updateDataset(ctx, modelId) {
        
    }

}

module.exports = ModelContract;
