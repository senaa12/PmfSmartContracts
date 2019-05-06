import React from "react";

import "./previousBetsDashboard.scss";

export default function PreviousBetsDashboard(props) {
    return(
        <div className="col-lg-3 col-md-6 flex-cols previous-bets-dashboard">
            <button type="button" className="btn btn-primary" onClick={props.refreshPreviousBets}>REFRESH</button>
        </div>
    );
}