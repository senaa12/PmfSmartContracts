class EthereumValueFetcher {
    constructor(){   
        this._prices = null; 
    }

    async _refreshEthereumPrice() {
        const priceResponse = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR");
        const prices = await priceResponse.json();
        if(prices.Response == "Error"){
            return { success: false, errorMessage: "EthereumValueFetcher: " + prices.Message };
        }

        this._prices = prices;
        return { success: true };
    }
}

export default new EthereumValueFetcher();