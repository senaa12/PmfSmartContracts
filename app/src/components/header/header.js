import React, { useCallback } from "react";
import classNames from "classnames";
import web3Wrapper from "../../utilities/web3Wrapper";

import "./header.scss";
import logo from "../../common/roulette.png";

import UnitsDropdown from "./unitsDropdown/unitsDropdown";

import { useAppState, useAnimations, useAppData } from "../../entities";

export default function Header(props) {
    const [ appState ] = useAppState();
    const [ animations, { toggleSpinResultAnimation }] = useAnimations();
    const [ appData ] = useAppData();

    const showAnimation = useCallback(() => toggleSpinResultAnimation(true));
    const endAnimation = useCallback(() => toggleSpinResultAnimation(false));

    let className = classNames("logo-image", { showAnimation: animations.spinResultAnimation });
    let appNameClassName = classNames("app-name", { offset: animations.spinResultAnimation });
    
    return (
        <div className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand mr-auto flex-fill">
                <img 
                    height={32} 
                    width={32} 
                    src={logo} 
                    className={className} 
                    onAnimationEnd={endAnimation} 
                    onClick={showAnimation}
                />
                <span className={appNameClassName}>CRYPTO ROULETTE</span>
            </a>
            <div className="holder">
                <div className="address-holder">Address: <span className="address">{web3Wrapper._userAddress}</span></div>
                <div className="balance-holder">Balance: <span className="balance">{Math.round(appData.userBalance * 100) / 100}</span> <span>{appState.selectedUnit.label}</span></div>
            </div>
            <UnitsDropdown />
        </div>
    );
}