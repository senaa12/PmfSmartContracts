import React from "react";

import "./singleSpin.scss";

export default function SingleSpin(props) {
    return(
        <tr>
            <th scope="row">{props.time.toLocaleString()}</th>
            <td>{props.address}</td>
            <td>{props.placedBetsID.map((id, index) => <span key={index}>{id} </span>)}</td>
            <td>{props.totalFundsPlaced}</td>
            <td>{props.selectedNumber}</td>
            <td>{props.isWinningSpin ? "WIN" : "LOST"}</td>
        </tr>
    );
}