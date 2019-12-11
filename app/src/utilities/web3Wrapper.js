import Web3 from 'web3';
import appSettings from './appSettings';
import { getSumArray } from "../common/helpFunctions";
import EthereumValueFetcher from "../utilities/ethereumValueFetcher";

class Web3Wrapper {
    constructor(){
        this._contract;
        this._web3;
        this._userAddress;
        this._isUserContractOwner;
        this._selectedUnit;
    }

    async _initialization(eventCallBack, selectedUnit, setUserAddress) {
        //#region UserRecognition
        // checking if browser is injected with metamask (ethereum)
        let errorMessage;
        if (window.ethereum) {
            try {
                await window.ethereum.enable();
            } catch (e) {
                console.error(e);
                if(e.code == 4001) {
                    return { success: false, errorMessage: "You need to approve connection between application and your account. Please refresh page and connect." };
                }
                else {
                    return { success: false, errorMessage: JSON.stringify(e) }; 
                }
            } finally {
                if(window.ethereum.networkVersion != 3 && !appSettings._isDevelopment) {
                    return { success: true, errorMessage: "Select Ropsten testnet in Metamask menu or application wont work."};
                }
                else if(appSettings._isDevelopment && window.ethereum.networkVersion < 10){
                    return { success: true, errorMessage: "You probbably want to select localhost testnet"};
                }
            }
            
            this._web3 = new Web3(window.ethereum);
        }
        // Legacy dapp browsers, they can always read everything they need
        else if (window.web3) {
            this._web3 = new Web3(web3.currentProvider);
        }
        // Non-dapp browsers (they do not have any wallet injected in them)...
        else {
            // const provider = new Web3.providers.HttpProvider("http://localhost:8545");
            // this._web3 = new Web3(provider);
            return { success: false, errorMessage: "You must have Metamask in your browser to access Ethereum blockchain"}
        }
        //#endregion

        //#region UserData
        this._userAddress = this._web3.givenProvider.selectedAddress;
        setUserAddress(this._userAddress);
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
        this._contract = new this._web3.eth.Contract(this._testContractAbi.abi, 
            !appSettings._isDevelopment ? "0x305f369c5dcad17d23da504ef8c562beefd925fe" : appSettings._contractAddress);
        
        this._contract.events.SpinResultEvent(
            { 
                fromBlock: "latest", 
                filter: { sender: this._userAddress }
            }, eventCallBack);

        const _contractOwner = await this._getContractOwner();
        // this._isUserContractOwner = _contractOwner.toLowerCase() == this._userAddress;

        const pricesFetch = await EthereumValueFetcher._refreshEthereumPrice();
        if(!pricesFetch.success){
            return pricesFetch;
        }

        this._selectedUnit = selectedUnit;
        return { success: true, errorMessage: errorMessage };
        //#endregion 
    }

    async _getCurrentUserBalance() {
        const res = await this._web3.eth.getBalance(this._userAddress);
        return this._customFromWei(res);
    }

    async _getLastSpinResults() {
        const res = await this._contract.methods.getSpinResults().call({ from: this._userAddress });
        return this._convertHexToDecimal(res.map(r => r._hex));
    }

    async _getLastSpins() {
        const res = await this._contract.methods.getLastSpins().call({ from: this._userAddress });
        return this._spinMapper(res);
    }

    async _getBalance() {
        const res = await this._contract.methods.getBalance().call({ from: this._userAddress });
        return this._customFromWei(res);
    }

    async _getContractOwner() {
        const res = await this._contract.methods.getContractOwner().call({ from: this._userAddress });
        return res;
    }

    async _placeBet(betIDs, amountsPerBet, showAnimation) {
        let hexBetIDs = this._convertDecimalToHex(betIDs);
        this._contract.methods.placeBet(hexBetIDs, amountsPerBet.map(b => this._customToWei(b))).send({ 
            from: this._userAddress, 
            value: this._customToWei(amountsPerBet.reduce(getSumArray, 0).toString())
        })
        .on('transactionHash', showAnimation)
        .on('confirmation', (confirmationNumber, receipt) => 
            confirmationNumber == 1 && console.log(receipt))
        .catch(console.error) 
    }

    _convertHexToDecimal(hex) {
        try{
            if(hex.length){
                let _decimal = [];
                for(let i = 0; i < hex.length; i++) {
                    _decimal.push(this._web3.utils.toDecimal(hex[i]));
                } 
                return _decimal;
            }
            else {
                return this._web3.utils.toDecimal(hex).toString();
            }    
        }
        catch(e){
            console.error(e);
        }
    }

    _convertDecimalToHex(decimal) {
        try{
            if(decimal.length){
                let _hex = [];
                for(let i = 0; i < decimal.length; i++) {
                    _hex.push(this._web3.utils.toHex(decimal[i]));
                } 
                return _hex;
            }
            else {
                return this._web3.utils.toHex(decimal);
            }
            
        }
        catch(e){
            console.error(e);
        }
    }

    _spinMapper(soliditySpins) {
        try{
            if(!soliditySpins) {
                return [];
            }
            let jsSpins = [];
            soliditySpins.forEach(s => {
                let spin = {
                    time: new Date(s.time*1000),
                    address: s.better,
                    isWinningSpin: s.isWinningSpin,
                    selectedNumber: s.selectedNumber,//this._convertHexToDecimal(s.selectedNumber),
                    placedBetsID: s.selectedItemID,//this._convertHexToDecimal(s.selectedItemID),
                    totalFundsPlaced: this._customFromWei(s.totalFundsPlaced)
                };
                jsSpins.push(spin);
            });
            return jsSpins.sort(function(x, y){
                return new Date(y.time) - new Date(x.time); 
            });
        }
        catch(e){
            console.error(e);
        }
    }

    _resultEventMapper(returnValues) {
        return {
            placedBetsID: returnValues.selectedItemID,//this._convertHexToDecimal(returnValues.selectedItemID),
            amountWon: this._customFromWei(returnValues.amountWon),
            address: returnValues.sender,
            isWinningSpin: returnValues.won,
            selectedNumber: returnValues.selectedNumber//this._convertHexToDecimal(returnValues.selectedNumber),

        }
    }

    _setUnit(unit) {
        this._selectedUnit = unit;
    }

    _customToWei(number) {
        return this._web3.utils.toWei(number.toString(), this._selectedUnit);
    }

    _customFromWei(number) {
        return this._web3.utils.fromWei(number.toString(), this._selectedUnit);
    }

    _toCurrencyValue(number) {
        const weiValue = this._customToWei(number);
        return EthereumValueFetcher._prices && (EthereumValueFetcher._prices.USD / 1000000000000000000) * weiValue;
    }
}

const web3Wrapper = new Web3Wrapper();
export default web3Wrapper;
