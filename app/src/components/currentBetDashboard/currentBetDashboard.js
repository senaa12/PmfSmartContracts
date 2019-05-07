import React, { useEffect, useState } from "react";
import Web3Wrapper from '../../utilities/web3Wrapper';
import SingleBet from "./singleBet/singleBet";

import "./currentBetDashboard.scss";

export default function CurrentBetDashboard(props) {
    return(
        <div className="col-lg-3 col-md-6 flex-cols current-bets-dashboard">
            {props.selections.length ? 
                <>
                {props.selections.map((bet, index) => 
                    <SingleBet
                        key={index} 
                        updateSpinAmounts={props.updateSpinAmounts} 
                        amount={props.amounts[index]} 
                        index={index} 
                        bet={bet}
                        removeSelection={props.removeSelection}
                     />)}
                <button type="button" className="btn btn-primary" onClick={props.spinWheel}>SPIN WHEEL</button> 
                </>
                : <h2>NO SELECTIONS</h2>}
        </div>
    );
}