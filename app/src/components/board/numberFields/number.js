import React from "react";

import './number.scss';

export default function Number(props) {
    let className = "number board-items " + props.backgroundColor;
    return (
        <div className={className} onClick={() => props.onSelection(props.number, props.label)}>
            {props.label}
        </div>
    );
}