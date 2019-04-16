
import React, { Component } from "react";
import Web3Test from '../utilities/web3.test';

import "./app.scss";

class App extends Component {
    constructor() {
        super();
        this.state = { accounts: Web3Test._getAccounts() };
    }

    render() {
        return (
            <div>
                <h1>TESTING</h1>
            </div>
        );
    }
}

export default App;