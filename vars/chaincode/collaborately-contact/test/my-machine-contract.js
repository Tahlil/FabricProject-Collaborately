/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { MyMachineContract } = require('..');
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

describe('MyMachineContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new MyMachineContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"my machine 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"my machine 1002 value"}'));
    });

    describe('#myMachineExists', () => {

        it('should return true for a my machine', async () => {
            await contract.myMachineExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a my machine that does not exist', async () => {
            await contract.myMachineExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createMyMachine', () => {

        it('should create a my machine', async () => {
            await contract.createMyMachine(ctx, '1003', 'my machine 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"my machine 1003 value"}'));
        });

        it('should throw an error for a my machine that already exists', async () => {
            await contract.createMyMachine(ctx, '1001', 'myvalue').should.be.rejectedWith(/The my machine 1001 already exists/);
        });

    });

    describe('#readMyMachine', () => {

        it('should return a my machine', async () => {
            await contract.readMyMachine(ctx, '1001').should.eventually.deep.equal({ value: 'my machine 1001 value' });
        });

        it('should throw an error for a my machine that does not exist', async () => {
            await contract.readMyMachine(ctx, '1003').should.be.rejectedWith(/The my machine 1003 does not exist/);
        });

    });

    describe('#updateMyMachine', () => {

        it('should update a my machine', async () => {
            await contract.updateMyMachine(ctx, '1001', 'my machine 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"my machine 1001 new value"}'));
        });

        it('should throw an error for a my machine that does not exist', async () => {
            await contract.updateMyMachine(ctx, '1003', 'my machine 1003 new value').should.be.rejectedWith(/The my machine 1003 does not exist/);
        });

    });

    describe('#deleteMyMachine', () => {

        it('should delete a my machine', async () => {
            await contract.deleteMyMachine(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a my machine that does not exist', async () => {
            await contract.deleteMyMachine(ctx, '1003').should.be.rejectedWith(/The my machine 1003 does not exist/);
        });

    });

});