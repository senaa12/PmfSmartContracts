import React, { useEffect, useState } from "react";
import SingleBet from "./singleBet/singleBet";
import EthereumValueFetcher from "../../utilities/ethereumValueFetcher";
import Web3Wrapper from "../../utilities/web3Wrapper";

import "./currentBetDashboard.scss";

export default function CurrentBetDashboard(props) {
    const [amountSum, setAmountSum] = useState(0);
    useEffect(() => {
        if(!props.amounts || !props.amounts.length){
            return;
        }
        let sum = 0;
        props.amounts.forEach(el => sum += parseInt(el));
        setAmountSum(props.web3Wrapper._toCurrencyValue(sum));
    }, [props.amounts, props.web3Wrapper._selectedUnit])

    useEffect(() => {
        if(props.warningAnimation) {
            setTimeout(() => props.showWarningAnimation(false), 10000);
        }
    }, [props.warningAnimation])

    return(
        <div className="flex-cols current-bets-dashboard">
            {props.selectedIDs.length ? 
                <>
                <div>
                {props.selectedIDs.map((bet, index) => 
                    <SingleBet
                        key={index} 
                        updateSpinAmounts={props.updateSpinAmounts} 
                        amount={props.amounts[index]} 
                        index={index} 
                        bet={bet}
                        removeSelection={props.removeSelection}
                        selectionID={props.selectedIDs[index]}
                     />)}
                     <div><b>Value:</b> {Math.round(amountSum * 100) / 100}$</div>
                     {props.warningAnimation && 
                        <div className="warning-animation">{"You cannot have more than 4 bets!"}</div>}
                     </div>
                <button type="button" className="btn btn-primary" onClick={props.spinWheel}>SPIN WHEEL</button> 
                </>
                : <div className="no-selections">NO SELECTIONS</div>}
        </div>
    );
}