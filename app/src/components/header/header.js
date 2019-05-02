import React from "react";
import Web3Wrapper from '../../utilities/web3Wrapper';

import "./header.scss";

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active navbar-brand">CRYPTO-ROULETTE</li>
                </ul>
                <div className="my-2 my-lg-0 address-holder">Address: <span className="address">{Web3Wrapper._userAddress}</span></div>
                <div className="my-2 my-lg-0 balance-holder">Balance: <span className="balance">{Web3Wrapper._userBalance} ETH</span></div>
                <button className="btn btn-dark refresh-button" onClick={() => Web3Wrapper._refreshCurrentUserBalance()}> Refresh</button> 
        </nav>
    );
}