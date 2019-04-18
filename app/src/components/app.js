
import React, { Component } from "react";
import Web3Test from '../utilities/web3.test';

import "./app.scss";

class App extends Component {
    constructor() {
        super();
        this.state = { number : null, lastSender: null, initialized: false, successfullInitialization: false, errorMessage: "", funds: null, newValue: "" };
        this._refreshNumber = this._refreshNumber.bind(this);
        this._setNumber = this._setNumber.bind(this);
    }

    async componentDidMount() {
        Web3Test._initialization()
            .then(res => 
                {
                    this.setState({ 
                        initialized: true, 
                        successfullInitialization: res.success, 
                        errorMessage: res.errorMessage }, this._refreshNumber());
                }).catch(console.log);
    }


    _refreshNumber ()  {
        Web3Test._getNumberSelected().then(res => this.setState({ number: res }));
        Web3Test._getLastSender().then(res => this.setState({ lastSender: res }));
        Web3Test._getCurrentUserBalance().then(res => this.setState({ funds: res }));
    }

    _setNumber() {
        Web3Test._setNumber(this.state.newValue).then(res => console.log(res)).catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                {this.state.initialized && <>
                    {this.state.successfullInitialization ?
                    <>
                    <h1>TESTING</h1>
                    <br />
                    <h2>current number {this.state.number ? this.state.number : ""}</h2>
                    <br />
                    <h2>last sender {this.state.lastSender ? this.state.lastSender : ""}</h2>
                    <br />
                    <h2>current user {Web3Test._userAddress}</h2>
                    <br />
                    <h2>balance {this.state.funds}</h2>
                    <br /> 
                    <button onClick={this._refreshNumber}>refresh</button>
                    <br />
                    <input value={this.state.newValue} onChange={e => this.setState({ newValue: e.target.value })}></input><button onClick={this._setNumber}>set</button> 
                    </> 
                    : <h1>{this.state.errorMessage}</h1>}
                </> }
            </div>
        );
    }
}

export default App;