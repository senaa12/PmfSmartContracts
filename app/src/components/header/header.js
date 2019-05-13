import React from "react";

import "./header.scss";

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand mr-auto flex-fill">CRYPTO-ROULETTE</a>
            <div className="holder">
                <div className="address-holder">Address: <span className="address">{props.web3Wrapper._userAddress}</span></div>
                <div className="balance-holder">Balance: <span className="balance">{props.userBalance} ETH</span></div>
            </div>
            <button className="btn btn-dark refresh-button" onClick={() => props.getUserBalance()}> Refresh</button> 
        </nav>
    );
}