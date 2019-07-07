import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "./portal.scss";
import { mapperBoardIdToDisplayNameMapper } from "../../common/helpFunctions";


export default function Portal(props) {
    const [portal, openPortal] = useState(null);

    useEffect(() => {
        openPortal(
            props.isOpen ?
            ReactDOM.createPortal(portalComponent, document.body) :
            null
        )
    }, [props.isOpen]);

    const portalComponent = props.lastSpin && <div className="portal">
        <div className="dashboard">
            <span className="title">Your transaction is processed!</span>
            <div>
                <span>Your selections are: </span>
                {props.lastSpin.placedBetsID.map((id, index) => <span key={index}>{index != 0 && ", "}{mapperBoardIdToDisplayNameMapper(id)}</span>)}
            </div>
            <div>Number drawn is {props.lastSpin.selectedNumber}, you {props.lastSpin.isWinningSpin ? <span className="win">WIN</span> : <span className="lost">LOST</span>} your bet.</div>
            <div>Winning amount: {props.lastSpin.isWinningSpin ? props.lastSpin.totalFundsPlaced : "0"} ETH.</div>
            <button type="button" className="btn btn-primary" onClick={()=>props.openPortal(false)}>CLOSE</button> 
        </div>
    </div>;

return portal;
}