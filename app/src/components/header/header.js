import React from "react";

import "./header.scss";
import logo from "../../common/roulette.png";

import UnitsDropdown from "./unitsDropdown/unitsDropdown";

export default function Header(props) {
    return (
        <div className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand mr-auto flex-fill">
                <img height={32} width={32} src={logo} className="logo-image" />
                <span className="app-name">CRYPTO-ROULETTE</span>
            </a>
            <div className="holder">
                <div className="address-holder">Address: <span className="address">{props.web3Wrapper._userAddress}</span></div>
                <div className="balance-holder">Balance: <span className="balance">{Math.round(props.userBalance * 100) / 100}</span> <span>{props.selectedUnit.label}</span></div>
            </div>
            <UnitsDropdown 
                selectedUnit={props.selectedUnit}
                changeSelectedUnit={props.changeSelectedUnit}
            />
            {/* <button className="btn btn-dark refresh-button" onClick={() => props.getUserBalance()}> Refresh</button>  */}
        </div>
    );
}