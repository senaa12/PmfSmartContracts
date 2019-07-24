import React from "react";
import Web3Wrapper  from "../../utilities/web3Wrapper";

import "./previousBetDashboard.scss";
import SingleBet from "./singleBet/singleBet";

const refreshIcon = require("../../common/refresh-icon.svg");

export default function PreviousBetDashboard(props) {

    return(
        <div className="flex-cols previous-bets-dashboard">
            <div className="table-holder">
            <table className="table table-striped table-custom">
                <thead>
                    <tr className="header">
                        <th scope="col">Time</th>
                        <th scope="col">Address</th>
                        <th scope="col">Selected Fields</th>
                        <th scope="col">Total Funds Placed ({props.selectedUnit.label})</th>
                        <th scope="col">Number Drawn</th>
                        <th scope="col">Result</th>
                    </tr>
                </thead>
                <tbody>
                {props.lastSpins.length ? props.lastSpins.map((s, index)=> 
                    <SingleBet
                        key={index}
                        index={index}
                        time={s.time}
                        address={s.address} 
                        isWinningSpin={s.isWinningSpin}
                        placedBetsID={s.placedBetsID}
                        selectedNumber={s.selectedNumber}
                        totalFundsPlaced={s.totalFundsPlaced}
                    />) : 
                    <tr><td className="no-selections" colSpan={6}>NO PREVIOUS BETS</td></tr>}
                </tbody>
            </table>
            </div>
            <div className="refresh-button-container">
                <button type="button" className="btn btn-primary col-md-12 refresh-button" onClick={props.refreshPreviousBets}>
                    <span>REFRESH</span>
                    <svg
                        className="refresh-icon"
                        dangerouslySetInnerHTML={{ __html: '<use xlink:href="#' + refreshIcon.default.id + '\"></use>' }}
                        width={18}
                        height={18}
                    />
                </button>
            </div>
            {Web3Wrapper._isUserContractOwner && 
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 refresh-button-container">
                <button type="button" className="btn btn-primary col-md-12" onClick={() => Web3Wrapper._getBalance()}>GET BALANCE</button>
            </div>}
        </div>
    );
}