import Web3 from 'web3';
import appSettings from './appSettings';
import { convertHexArrayToDecimal } from '../common/converters';

class Web3Test {
    constructor(){
        // write all variables so it is easier to read
        this._contract;
        this._web3;
        this._userAddress;
        this._userBalance;
    }

    // this function initializes web3 and connects to contract
    // contract itself is stored in this._contractInstance variable
    async _initialization() {
        
        // first initialization of web3js
        // we need to detect if browser is 'injected' with web3js, so we can reed adress of user
        if (window.ethereum) {

            this._web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
            } catch (e) {
                return { success: false, errorMessage: e.message };
                // return Promise().reject(e.message);
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
            return { success: false, errorMessage: "You must have Metamask in your browser to access Ethereum blockchain"}
        }


        // saving user address
        this._userAddress = this._web3.givenProvider.selectedAddress;

        this._userBalance = await this._getCurrentUserBalance();

        //initialization of conncection to smart contract
        try {
            // also need to automate somehow path finding
            this._testContractAbi = require("../../build/contracts/CryptoRoulette.json");
        } catch (e) {
            return { success: false, errorMessage: "There is no smart contract ABI provided" }
            //TODO: return and handle error needed
        }

        if(appSettings._contractAddress === null) {
            return { success: false, errorMessage: "No Address for smart contract provided" };
        }

        // need better handle and read on what address smart contract is located
        this._contract = this._web3.eth.Contract(this._testContractAbi.abi, appSettings._contractAddress);

        // now we have in this._contractInstance instance of our smart contract and now we can call functions on it
        // TEMPLATE FOR CALLING FUNCTIONS, wrapper must be async func: 
        // const res = await this._contract.methods.MethodName(params).call() for functions that read smart contract state
        // for altering smart contract state you must send a transaction 
        // also check the docs https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods for more
        // OTHER USEFUL STUFF: web3.utils.hexToNumberString
        // also TODO: check if actually connected and check if account changed?
        // idea for connection, write some random function on smart contract which you will ping for connection right here
        return { success: true };
    }

    async _checkAccount() {
        const currentAccount = await this._web3.eth.getAccounts();
        if(currentAccount[0].toLocaleLowerCase().toString() !== this._userAddress.toLocaleLowerCase().toString()){
            return { errorMessage: "Account changed" };
        }
        return { errorMessage: null };
    }

    async _getLastSpins() {
        const res = await this._contract.methods.getLastSpins().call();
        console.log(res);
        
        return null;
    }

    async getBalanceForCurrentUser() {
        const res = await this._web3.eth.getBalance(this._userAddress);
        console.log(res);
    }

    async _getLastSpinResults() {
        const res = await this._contract.methods.getSpinResults().call();
        return convertHexArrayToDecimal(res.map(r => r._hex));
    }

    async _placeBet(newNum, amount) {
        this._contract.methods.placeBet([this._web3.utils.toHex(newNum)], [this._web3.utils.toHex(amount)]).send({ from: this._userAddress, value: this._web3.utils.toWei("1", "ether") })
        .on('confirmation', (confirmationNumber, receipt) =>  console.log(receipt))
        .catch(ex => console.log(ex))
    }

    async _getCurrentUserBalance() {
        const res = await this._web3.eth.getBalance(this._userAddress);
        return this._web3.utils.fromWei(res, 'ether');
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