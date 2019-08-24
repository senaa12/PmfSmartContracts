import React, {useState, useEffect, useRef} from "react";
import { Units } from "../../../common/enums";

import "./unitsDropdown.scss";

function OusideClickHandler(props) {
    const wrapperRef = useRef(null);

    const handleClick = (e) => {
        if(wrapperRef.current && !wrapperRef.current.contains(e.target)){
            props.onOutsideClick();
        }

        document.removeEventListener("mousedown", handleClick);
    }

    useEffect(() => {
        if(props.shouldAddEvenetListener){
            document.addEventListener("mousedown", handleClick);
        }

    }, [props.shouldAddEvenetListener]);

    return (<div ref={wrapperRef}>{props.children}</div>)
}

function DropdownItem(props) {
    let customClass = "dropdown-item-custom";
    customClass += props.index === 0 ? " first" : "";
    return (<div className={customClass} onClick={() => props.handleUnitClick(props.unit) }>
        {props.unit.label}
    </div>);
}

export default function UnitsDropdown(props) {
    const [isMenuOpen, openMenu] = useState(false);
    const dropdownRef = useRef(null);

    const handleUnitClick = (unit) => {
        props.changeSelectedUnit(unit);
        openMenu(false);
    }

    return(
        <OusideClickHandler 
            onOutsideClick={() => openMenu(false)} 
            shouldAddEvenetListener={isMenuOpen}
        >
            <div className="dropdown-custom" ref={dropdownRef} >
                <button className="btn dropdown-toggle custom-button" onClick={() => openMenu(!isMenuOpen)}>
                    {props.selectedUnit.label}
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