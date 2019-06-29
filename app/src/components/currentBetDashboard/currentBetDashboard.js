import React from "react";
import SingleBet from "./singleBet/singleBet";

import "./currentBetDashboard.scss";

export default function CurrentBetDashboard(props) {

    return(
        <div className="col-lg-3 col-md-3 flex-cols current-bets-dashboard">
            {props.selectedIDs.length ? 
                <>
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
                <button type="button" className="btn btn-primary" onClick={props.spinWheel}>SPIN WHEEL</button> 
                </>
                : <h2>NO SELECTIONS</h2>}
        </div>
    );
}