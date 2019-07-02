import React from "react";
import SingleBet from "./singleBet/singleBet";

import "./currentBetDashboard.scss";

export default function CurrentBetDashboard(props) {

    return(
        <div className="col-lg-3 col-md-3 flex-cols current-bets-dashboard">
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
                     </div>
                <button type="button" className="btn btn-primary" onClick={props.spinWheel}>SPIN WHEEL</button> 
                </>
                : <div className="no-selections">NO SELECTIONS</div>}
        </div>
    );
}