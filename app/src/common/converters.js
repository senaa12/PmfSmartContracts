import Web3Wrapper from '../utilities/web3Wrapper';

export function convertHexToDecimal(hex) {
    try{
        if(hex.length){
            let _decimal = [];
            for(let i = 0; i < hex.length; i++) {
                _decimal.push(Web3Wrapper._web3.utils.toDecimal(hex[i]));
            } 
            return _decimal;
        }
        else {
            return Web3Wrapper._web3.utils.toDecimal(hex).toString();
        }
        
    }
    catch(e){
        console.log(e);
    }
}

export function convertDecimalToHex(decimal) {
    try{
        if(decimal.length){
            let _hex = [];
            for(let i = 0; i < decimal.length; i++) {
                _hex.push(Web3Wrapper._web3.utils.toHex(decimal[i]));
            } 
            return _hex;
        }
        else {
            return Web3Wrapper._web3.utils.toHex(decimal);
        }
        
    }
    catch(e){
        console.log(e);
    }
}

export function SpinMapper(soliditySpin) {
    try{
        let jsSpins = [];
        soliditySpin.forEach(s => {
            let spin = {
                time: new Date(s.time*1000),
                address: s.better,
                isWinningSpin: s.isWinningSpin,
                selectedNumber: convertHexToDecimal(s.selectedNumber),
                placedBetsID: convertHexToDecimal(s.selectedItemID),
                totalFundsPlaced: Web3Wrapper._web3.utils.fromWei(s.totalFundsPlaced.toString(), "ether")
            };
            jsSpins.push(spin);
        });
        return jsSpins.sort(function(x, y){
            return new Date(y.time) - new Date(x.time); 
        });
    }
    catch(e){
        console.log(e);
    }
}
