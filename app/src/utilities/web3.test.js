import Web3 from 'web3';
import appSettings from './appSettings';

class Web3Test {
    constructor(){
        // when writing for real, dont call this in constructor, because of error handling
        this._initialization();
    }

    // this function initializes web3 and connects to contract
    // contract itself is stored in this._contractInstance variable
    async _initialization() {
        this._web3;

        // first initialization of web3js
        // we need to detect if browser is 'injected' with web3js, so we can reed adress of user
        if (window.ethereum) {

            this._web3 = new Web3(window.ethereum);
            try {
                await ethereum.enable();
            } catch (e) {
                console.log(e)
                // User denied account access...
                // TODO: you must test that and throw some errors that app needs this premissions
            }
        }
        // Legacy dapp browsers, they can always read everything they need
        else if (window.web3) {
            this._web3 = new Web3(web3.currentProvider);
        }
        // Non-dapp browsers (they do not have any wallet injected in them)...
        else {
            // We are either on the server or the user isn't running metamask
            // this must throw error in production
            // currently you can fall back to localhost but then you will use first account as default
            const provider = new Web3.providers.HttpProvider("http://localhost:8545");
            this._web3 = new Web3(provider);
            //TODO: MUST THROW ERROR;
        }

        // saving user address
        this._userAddress = this._web3.givenProvider.selectedAddress

        //initialization of conncection to smart contract
        try {
            // also need to automate somehow path finding
            this._testContractAbi = require("../../build/contracts/TestContract.json");
        } catch (e) {
            console.log(e);
            //TODO: return and handle error needed
        }
        // need better handle and read on what address smart contract is located
        this._contract = this._web3.eth.Contract(this._testContractAbi.abi, "0x86c978C2a79d574E9A346F56D2aF1Ac0CA8160Ca");

    // now we have in this._contractInstance instance of our smart contract and now we can call functions on it
    // TEMPLATE FOR CALLING FUNCTIONS, wrapper must be async func: 
    // const res = await this._contract.methods.MethodName(params).call() for functions that read smart contract state
    // for altering smart contract state you must send a transaction 
    // also check the docs https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods for more
    // OTHER USEFUL STUFF: web3.utils.hexToNumberString
    // also TODO: check if actually connected and check if account changed?
}

async _getNumberSelected() {
    const res = await this._contract.methods.getTest().call();
    return this._web3.utils.hexToNumberString(res._hex);
}

async _getLastSender() {
    const res = await this._contract.methods.getSender().call();
    return res;
}

async _setNumber(newNum) {
    // this._contract.methods.setTest(this._web3.utils.toHex(123)).send({
    //     from: '0x27d976918803d5F7EdCEcB21cDc098dCD3a133BF'
    // })
    // .on('confirmation', (confirmationNumber, receipt) => {console.log(receipt); console.log(confirmationNumber)})
    // .catch(ex => console.log(ex))
}

_defaultCallBack(err, res) {
    let retValue;
    if(err) {
        retValue = err;
        console.log(err);
    } else {
        retValue = res;
        console.log(res);
    }
    return retValue;
}

}

const web3Test = new Web3Test();

export default web3Test;