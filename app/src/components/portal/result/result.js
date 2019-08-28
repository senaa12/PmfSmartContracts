import React from "react";
import { mapperBoardIdToDisplayNameMapper } from "../../../common/helpFunctions";
import "./result.scss";

export default function result(props){
    return (
        <div>
            <div>
                <span>Your {props.resultData.placedBetsID.length == 1 ? "selection is ": "selections are: "}</span>
                {props.resultData.placedBetsID.map((id, index) => <span key={index}>{index != 0 && ", "}{mapperBoardIdToDisplayNameMapper(id)}</span>)}
            </div>
            <div>Number drawn is {props.resultData.selectedNumber} so you {props.resultData.isWinningSpin ? <span className="win">WIN</span> : <span className="lost">LOST</span>} your bet.</div>
            {props.resultData.isWinningSpin && <div>Winning amount: {props.resultData.amountWon} ETH.</div>}
        </div>
    )
} 