import Web3 from 'web3';
import appSettings from './appSettings';
import { convertHexToDecimal, convertDecimalToHex, SpinMapper } from '../common/converters';
import { getSumArray } from "../common/helpFunctions";

class Web3Wrapper {
    constructor(){
        this._contract;
        this._web3;
        this._userAddress;
        this._userBalance;
        this._isUserContractOwner;
    }

    async _initialization() {
        //#region UserRecognition
        // checking if browser is injected with metamask (ethereum)
        if (window.ethereum) {

            this._web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
            } catch (e) {
                // user denied premissions
                return { success: false, errorMessage: e.message };
            }
        }
        // Legacy dapp browsers, they can always read everything they need
        else if (window.web3) {
            this._web3 = new Web3(web3.currentProvider);
        }
        // Non-dapp browsers (they do not have any wallet injected in them)...
        else {
            const provider = new Web3.providers.HttpProvider("http://localhost:8545");
            this._web3 = new Web3(provider);
            //TODO: MUST THROW ERROR IN PRODUCTION;
            return { success: false, errorMessage: "You must have Metamask in your browser to access Ethereum blockchain"}
        }
        //#endregion

        //#region UserData
        this._userAddress = this._web3.givenProvider.selectedAddress;
        this._userBalance = await this._getCurrentUserBalance();
        //#endregion

        //#region SmartContractData
        //initialization of conncection to smart contract
        try {
            this._testContractAbi = require("../../build/contracts/CryptoRoulette.json");
        } catch (e) {
            return { success: false, errorMessage: "There is no smart contract ABI provided" }
        }

        if(appSettings._contractAddress === null) {
            return { success: false, errorMessage: "No Address for smart contract provided" };
        }
        this._contract = this._web3.eth.Contract(this._testContractAbi.abi, appSettings._contractAddress);
        
        const _contractOwner = await this._getContractOwner()
        this._isUserContractOwner = _contractOwner.toLowerCase() == this._userAddress;
        
        return { success: true };
        //#endregion 
    }

    async _refreshCurrentUserBalance() {
        this._userBalance = undefined;
        let newBalance = await this._getCurrentUserBalance();
        this._userBalance = newBalance;
    }

    async _getCurrentUserBalance() {
        const res = await this._web3.eth.getBalance(this._userAddress);
        return this._web3.utils.fromWei(res, 'ether');
    }

    async _getLastSpinResults() {
        const res = await this._contract.methods.getSpinResults().call();
        return convertHexToDecimal(res.map(r => r._hex));
    }

    async _getLastSpins() {
        const res = await this._contract.methods.getLastSpins().call();
        return SpinMapper(res);
    }

    async _getBalance() {
        const res = await this._contract.methods.getBalance().call();
        console.log(this._web3.utils.fromWei(res.toString(), "ether"));
        return this._web3.utils.fromWei(res.toString(), "ether");
    }

    async _getContractOwner() {
        const res = await this._contract.methods.getContractOwner().call()
        return res;
    }

    async _placeBet(betIDs, amountsPerBet) {
        let hexBetIDs = convertDecimalToHex(betIDs);
        this._contract.methods.placeBet(hexBetIDs, amountsPerBet.map(b => this._web3.utils.toWei(b.toString(), "ether"))).send({ 
            from: this._userAddress, 
            value: this._web3.utils.toWei(amountsPerBet.reduce(getSumArray, 0).toString(), "ether") 
        })
        .on('confirmation', (confirmationNumber, receipt) => console.log(receipt))
        .catch(console.log) 
    }
}

const web3Wrapper = new Web3Wrapper();

export default web3Wrapper;