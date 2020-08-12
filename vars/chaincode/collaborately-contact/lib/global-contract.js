/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MyMachineContract extends Contract {

    async machineExists(ctx, myMachineId) {
        const buffer = await ctx.stub.getState(myMachineId);
        return (!!buffer && buffer.length > 0);
    }

    async registerMachine(ctx, myMachineId, value) {
        const exists = await this.machineExists(ctx, myMachineId);
        if (exists) {
            throw new Error(`The my machine ${myMachineId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myMachineId, buffer);
    }

    async verifyModel(ctx, myMachineId) {
        const exists = await this.machineExists(ctx, myMachineId);
        if (!exists) {
            throw new Error(`The my machine ${myMachineId} does not exist`);
        }
        const buffer = await ctx.stub.getState(myMachineId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async trainModel(ctx, myMachineId, newValue) {
        const exists = await this.machineExists(ctx, myMachineId);
        if (!exists) {
            throw new Error(`The my machine ${myMachineId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(myMachineId, buffer);
    }

    async unregisterMachine(ctx, myMachineId) {
        const exists = await this.machineExists(ctx, myMachineId);
        if (!exists) {
            throw new Error(`The my machine ${myMachineId} does not exist`);
        }
        await ctx.stub.deleteState(myMachineId);
    }

    async acessDataset(){
        
    }

}

module.exports = MyMachineContract;
