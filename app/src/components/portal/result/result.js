import React from "react";
import { mapperBoardIdToDisplayNameMapper } from "../../../common/helpFunctions";
import "./result.scss";

export default function result(props){
    return (
        <div>
            <div>
                {/* <span>Your selections are: </span>
                {props.lastSpin.placedBetsID.map((id, index) => <span key={index}>{index != 0 && ", "}{mapperBoardIdToDisplayNameMapper(id)}</span>)} */}
            </div>
            <div>Number drawn is TODO, you {props.resultData.isWinningSpin ? <span className="win">WIN</span> : <span className="lost">LOST</span>} your bet.</div>
            <div>Winning amount: {props.resultData.amountWon} ETH.</div> 
        </div>
    )
} 