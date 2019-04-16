import Web3 from 'web3';
import appSettings from './appSettings';

class Web3Test {
    constructor(){
        this._initializeWeb3();
    }

    _initializeWeb3() {
        this._web3;
        if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
            //We are in the browser and metamask in running
            this._web3 = new Web3(window.web3.currentProvider);
          } else {
            //We are either on the server or the user isn't running metamask
            const provider = new Web3.providers.HttpProvider(appSettings._networkPort);
         
            this._web3 = new Web3(provider);
        }
    }

    _getAccounts() {
        this._web3.eth.getAccounts(this._defaultCallBack)
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