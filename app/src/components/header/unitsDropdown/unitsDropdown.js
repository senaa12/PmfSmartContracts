import React, {useState, useEffect, useRef, useCallback} from "react";
import classNames from "classnames";
import { Units } from "../../../common/enums";

import "./unitsDropdown.scss";

import { useAppState } from "../../../entities";

function OusideClickHandler(props) {
    const wrapperRef = useRef(null);

    const handleClick = useCallback((e) => {
        if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
            props.onOutsideClick();
        }

        document.removeEventListener("mousedown", handleClick);
    })

    useEffect(() => {
        if(props.shouldAddEvenetListener){
            document.addEventListener("mousedown", handleClick);
        }

    }, [props.shouldAddEvenetListener]);

    return (<div ref={wrapperRef}>{props.children}</div>)
}

function DropdownItem(props) {
    const onClick = useCallback(() => props.handleUnitClick(props.unit));

    return (
        <div className={"dropdown-item-custom"} onClick={onClick}>
            {props.unit.label}
        </div>
    );
}

export default function UnitsDropdown(props) {
    const [ appState, { changeSelectedUnit }] = useAppState();

    const [isMenuOpen, openMenu] = useState(false);
    const dropdownRef = useRef(null);

    const handleUnitClick = useCallback((unit) => {
        changeSelectedUnit(unit);
        props.refreshAllData();
        openMenu(false);
    });
    const closeMenu = useCallback(() => openMenu(false));
    const toogleMenu = useCallback(() => openMenu(!isMenuOpen), [isMenuOpen]);

    const buttonClassname = classNames({ dropdownIsOpen: isMenuOpen }, "btn dropdown-toggle custom-button");

    return(
        <OusideClickHandler 
            onOutsideClick={closeMenu} 
            shouldAddEvenetListener={isMenuOpen}
        >
            <div className="dropdown-custom" ref={dropdownRef} >
                <button className={buttonClassname} onClick={toogleMenu}>
                    {appState.selectedUnit.label}
                </button>
                {isMenuOpen && <div className="dropdown-content">
                    {Object.keys(Units).map((k, index) => 
                        <DropdownItem 
                            key={index} 
                            index={index} 
                            unit={Units[k]} 
                            handleUnitClick={handleUnitClick} />)}
                </div>}
            </div>
        </OusideClickHandler>);
}