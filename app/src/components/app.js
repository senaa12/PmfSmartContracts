
import React, { Component } from "react";
import Web3Test from '../utilities/web3.test';

import "./app.scss";

class App extends Component {
    constructor() {
        super();
        this.state = { number : null, lastSender: null };
        this._refreshNumber = this._refreshNumber.bind(this);
        this._setNumber = this._setNumber.bind(this);
    }

    componentDidMount() {
        //this._refreshNumber();
    }

    _refreshNumber ()  {
        Web3Test._getNumberSelected().then(res => this.setState({ number: res }));
        Web3Test._getLastSender().then(res => this.setState({ lastSender: res }));
    }

    _setNumber() {
        Web3Test._setNumber().then(res => console.log(res)).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <h1>TESTING</h1>
                <br />
                <h2>current number {this.state.number ? this.state.number : ""}</h2>
                <br />
                <h2>last sender {this.state.lastSender ? this.state.lastSender : ""}</h2>
                <br />
                <button onClick={this._refreshNumber}>refresh</button>
                <br />
                <button onClick={this._setNumber}>set</button>
            </div>
        );
    }
}

export default App;