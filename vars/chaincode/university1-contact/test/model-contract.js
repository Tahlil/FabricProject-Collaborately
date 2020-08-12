/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { ModelContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('ModelContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new ModelContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"model 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"model 1002 value"}'));
    });

    describe('#modelExists', () => {

        it('should return true for a model', async () => {
            await contract.modelExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a model that does not exist', async () => {
            await contract.modelExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createModel', () => {

        it('should create a model', async () => {
            await contract.createModel(ctx, '1003', 'model 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"model 1003 value"}'));
        });

        it('should throw an error for a model that already exists', async () => {
            await contract.createModel(ctx, '1001', 'myvalue').should.be.rejectedWith(/The model 1001 already exists/);
        });

    });

    describe('#readModel', () => {

        it('should return a model', async () => {
            await contract.readModel(ctx, '1001').should.eventually.deep.equal({ value: 'model 1001 value' });
        });

        it('should throw an error for a model that does not exist', async () => {
            await contract.readModel(ctx, '1003').should.be.rejectedWith(/The model 1003 does not exist/);
        });

    });

    describe('#updateModel', () => {

        it('should update a model', async () => {
            await contract.updateModel(ctx, '1001', 'model 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"model 1001 new value"}'));
        });

        it('should throw an error for a model that does not exist', async () => {
            await contract.updateModel(ctx, '1003', 'model 1003 new value').should.be.rejectedWith(/The model 1003 does not exist/);
        });

    });

    describe('#deleteModel', () => {

        it('should delete a model', async () => {
            await contract.deleteModel(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a model that does not exist', async () => {
            await contract.deleteModel(ctx, '1003').should.be.rejectedWith(/The model 1003 does not exist/);
        });

    });

});