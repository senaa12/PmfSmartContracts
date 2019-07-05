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
            <div>{props.lastSpin.placedBetsID.map((id, index) => <span key={index}>{mapperBoardIdToDisplayNameMapper(id)}  </span>)}</div>
            <div>{props.isWinningSpin ? "WIN" : "LOST"}</div>
            <div>{props.lastSpin.totalFundsPlaced}</div>
            <button type="button" className="btn btn-primary" onClick={()=>props.openPortal(false)}>CLOSE</button> 
        </div>
    </div>;

return portal;
}