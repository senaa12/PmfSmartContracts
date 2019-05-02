import React from "react";

import './number.scss';

export default function Number(props) {
    return (
        <div className="number board-items" onClick={() => props.onSelection(props.number)}>
            {props.number}
        </div>
    );
}