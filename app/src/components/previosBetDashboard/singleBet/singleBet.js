import React, { useMemo } from "react";
import classNames from "classnames";

import { mapperBoardIdToDisplayNameMapper } from "../../../common/helpFunctions";

import "./SingleBet.scss";

export default function SingleBet(props) {
    const style = useMemo(() => {
        const delay = props.index * 60;
        return {
            animationName: "animate",
            animationDuration: "1s",
            animationDelay: `${delay}ms`,
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards"
        };
    }, [])
    

    const rowClassName = classNames("custom-row", { dark: props.index % 2 });
    return(
        <tr className={rowClassName} style={style}>
            <th scope="row">{props.time.toLocaleString()}</th>
            <td>{props.address}</td>
            <td>{props.placedBetsID.map((id, index) => <span key={index}>{mapperBoardIdToDisplayNameMapper(id)}  </span>)}</td>
            <td>{props.totalFundsPlaced}</td>
            <td>{props.selectedNumber}</td>
            <td>{props.isWinningSpin ? "WIN" : "LOST"}</td>
        </tr>
    );
}