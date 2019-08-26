class EthereumValueFetcher {
    constructor(){   
        this._prices = null; 
    }

    async _refreshEthereumPrice() {
        const priceResponse = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=HRK,USD,EUR");
        const prices = await priceResponse.json();
        if(!prices.HRK || !prices.USD || !prices.EUR){
            return { success: false, errorMessage: "EthereumValueFetcher: " + JSON.stringify(prices) };
        }

        this._prices = prices;
        return { success: true };
    }
}

export default new EthereumValueFetcher();