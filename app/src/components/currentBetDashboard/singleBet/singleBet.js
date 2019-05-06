import React, { useEffect, useState } from "react";
import Web3Wrapper from '../../../utilities/web3Wrapper';

import "./singleBet.scss";

export default function SingleBet(props) {

    return(
        <div className="flex-row single-bet">
            <h3>{props.bet}</h3>
            <input type="number" min={0} className="form-control custom-form-control" />
            <button type="button" className="close" aria-label="Close" onClick={() => {}}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}