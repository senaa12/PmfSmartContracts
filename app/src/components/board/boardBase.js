import React from "react";
import Web3Wrapper from '../../utilities/web3Wrapper';
import Number from './numberFields/number';

import './boardBase.scss';
const fields = require("../../common/numbers.json");

export default function BoardBase(props) {
    let numbers = [];
    for(let i = 1; i < 37; i++){
        numbers.push(i);
    }
    const renderFields = (field) => {
        switch(field.id) {
            case 0:
                let className = "numbers-zero board-items " + field["background-color"];
                return (<div className={className} key={field.id} onClick={() => props.onSelection(field.id)}>{field.label}</div>)
            default:
                return <div key="numbers" className="numbers">{field.map(num => <Number backgroundColor={num["background-color"]} number={num.label} key={num.id} onSelection={props.onSelection}/>)}</div>            
        }
    } 

    return (
        <div className="col-lg-9 col-md-12 board-base">
            {fields.map(field => renderFields(field))}
        </div>
    );
}