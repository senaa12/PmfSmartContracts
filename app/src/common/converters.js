import Web3Wrapper from '../utilities/web3Wrapper';

export function convertHexArrayToDecimal(hexArray) {
    try{
        let _decimalArray = [];
        for(let i = 0; i < hexArray.length; i++) {
            _decimalArray.push(Web3Wrapper._web3.utils.toDecimal(hexArray[i]));
        } 
        return _decimalArray;
    }
    catch(e){
        console.log(e);
    }
}

export function convertDecimalArrayToHex(decimalArray) {
    try{
        let _hexArray = [];
        for(let i = 0; i < decimalArray.length; i++) {
            _hexArray.push(Web3Wrapper._web3.utils.toHex(decimalArray[i]));
        } 
        return _hexArray;
    }
    catch(e){
        console.log(e);
    }
}
