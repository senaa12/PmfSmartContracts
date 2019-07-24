import React, {useState} from "react";
import { Units } from "../../../common/enums";

import "./unitsDropdown.scss";

function DropdownItem(props) {
    let customClass = "dropdown-item-custom";
    customClass += props.index === 0 ? " first" : "";
    return (<div className={customClass} onClick={() => { props.changeSelectedUnit(props.unit); props.closeDropdown(false); } }>
        {props.unit.label}
    </div>);
}

export default function UnitsDropdown(props) {
    const [isMenuOpen, openMenu] = useState(false);
    return(
        <div className="dropdown-custom">
            <button className="btn dropdown-toggle custom-button" onClick={() => openMenu(!isMenuOpen)}>
                {props.selectedUnit.label}
            </button>
            {isMenuOpen && <div className="dropdown-content">
                {Object.keys(Units).map((k, index) => <DropdownItem key={index} index={index} closeDropdown={openMenu} unit={Units[k]} changeSelectedUnit={props.changeSelectedUnit} />)}
            </div>}
        </div>);
}