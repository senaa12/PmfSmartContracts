import React, { useEffect, useState } from "react";
import Web3Wrapper from '../../../utilities/web3Wrapper';

import "./singleBet.scss";

export default function SingleBet(props) {

    return(
        <div className="flex-row single-bet">
            <span className="font-weight-bold label">{props.bet}</span>
            <input 
                type="number" 
                min={0} 
                className="form-control custom-form-control form-control-sm" 
                value={props.amount}
                onChange={(e) => props.updateSpinAmounts(e.target.value, props.index)}
                />
            <button type="button" className="close" aria-label="Close" onClick={() => props.removeSelection(props.index)}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}