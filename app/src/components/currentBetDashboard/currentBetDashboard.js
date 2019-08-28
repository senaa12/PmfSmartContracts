import React, { useEffect, useState, useCallback } from "react";
import classNames from "classnames";
import SingleBet from "./singleBet/singleBet";
import web3Wrapper from "../../utilities/web3Wrapper";
import { useAppData, useAnimations } from "../../entities";

import "./currentBetDashboard.scss";

export default function CurrentBetDashboard(props) {
    const [ appData, { 
        removeCurrentSelection, 
        updateCurrentSelectionSpinAmounts } ] = useAppData();
    const [ animations, { toggleWarningAnimation }] = useAnimations();

    const updateSpinAmounts = useCallback((newAmount, index) => updateCurrentSelectionSpinAmounts(newAmount, index));
    const removeSelection = useCallback((index) => removeCurrentSelection(index));
    const endAnimation = useCallback(() => toggleWarningAnimation(false));

    const [amountSum, setAmountSum] = useState(0);
    useEffect(() => {
        if(!appData.currentSelectedAmounts || !appData.currentSelectedAmounts.length){
            return;
        }
        let sum = 0;
        appData.currentSelectedAmounts.forEach(el => sum += el ? parseInt(el) : 0);
        setAmountSum(web3Wrapper._toCurrencyValue(sum));
    }, [appData.currentSelectedAmounts, web3Wrapper._selectedUnit]);

    const warningClassname = classNames("warning-animation", { showWarningAnimation: animations.warningAnimation });

    return(
        <div className="flex-cols current-bets-dashboard">
            {appData.currentSelectedIDs.length ? 
                <>
                <div>
                {appData.currentSelectedIDs.map((bet, index) => 
                    <SingleBet
                        key={index} 
                        updateSpinAmounts={updateSpinAmounts} 
                        amount={appData.currentSelectedAmounts[index]} 
                        index={index} 
                        bet={bet}
                        removeSelection={removeSelection}
                        selectionID={appData.currentSelectedIDs[index]}
                     />)}
                    <div><b>Value:</b> {Math.round(amountSum * 100) / 100}$</div>
                    <div className={warningClassname} onAnimationEnd={endAnimation}>
                        You cannot have more than 4 bets!
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={props.spinWheel}>SPIN WHEEL</button> 
                </>
                : <div className="no-selections">NO SELECTIONS</div>}
        </div>
    );
}