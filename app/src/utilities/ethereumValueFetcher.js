class EthereumValueFetcher {
    constructor(){   
        this._prices = null; 
        
        this._refreshEthereumPrice();
    }

    async _refreshEthereumPrice() {
        const priceResponse = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR");
        this._prices = await priceResponse.json();
    }
}

export default new EthereumValueFetcher();