import React, { useCallback } from "react";
import classNames from "classnames";

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
                <div className="address-holder">Address: <div className="address">{appState.userAddress}</div></div>
                <div className="balance-holder">Balance: <div className="balance">{Math.round(appData.userBalance * 100) / 100}</div> <span>{appState.selectedUnit.label}</span></div>
            </div>
            <UnitsDropdown />
        </div>
    );
}