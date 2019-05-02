import React from "react";
import Web3Wrapper from '../../utilities/web3Wrapper';
import Number from './numberFields/number';

import './boardBase.scss';

export default function BoardBase(props) {
    let numbers = [];
    for(let i = 1; i < 37; i++){
        numbers.push(i);
    }

    return (
        <div className="col-lg-9 col-md-10 col-sm-12 board-base">
            <div className="numbers-zero board-items" onClick={() => props.onSelection(0)}>0</div>
            <div className="numbers">{numbers.map(n => <Number number={n} key={n} onSelection={props.onSelection}/>)}</div>
        </div>
    );
}