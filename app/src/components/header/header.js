import React from "react";

import "./header.scss";
import logo from "../../common/roulette.png";

import UnitsDropdown from "./unitsDropdown/unitsDropdown";

export default function Header(props) {
    let className = "logo-image";
    let appNameClassName = "app-name";
    className += props.spinAnimation ? ' show-animation ' : '';
    appNameClassName += props.spinAnimation ? ' offset' : '';
    return (
        <div className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand mr-auto flex-fill">
                <img 
                    height={32} 
                    width={32} 
                    src={logo} 
                    className={className} 
                    onAnimationEnd={props.endAnimation} 
                    onClick={props.showAnimation}
                />
                <span className={appNameClassName}>CRYPTO ROULETTE</span>
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