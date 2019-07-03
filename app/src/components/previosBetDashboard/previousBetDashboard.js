import React from "react";
import Web3Wrapper  from "../../utilities/web3Wrapper";

import "./previousBetDashboard.scss";
import SingleBet from "./singleBet/singleBet";

export default function PreviousBetDashboard(props) {

    return(
        <div className="flex-cols previous-bets-dashboard">
            <table className="table table-striped table-custom">
                <thead>
                    <tr className="header">
                        <th scope="col">Time</th>
                        <th scope="col">Address</th>
                        <th scope="col">Selected Fields</th>
                        <th scope="col">Total Funds Placed</th>
                        <th scope="col">Number Drawn</th>
                        <th scope="col">Winner</th>
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
                    <tr className="no-selections">NO PREVIOUS BETS</tr>}
                </tbody>
            </table>
            <div className="refresh-button-container">
                <button type="button" className="btn btn-primary col-md-12" onClick={props.refreshPreviousBets}>REFRESH</button>
            </div>
            {Web3Wrapper._isUserContractOwner && 
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 refresh-button-container">
                <button type="button" className="btn btn-primary col-md-12" onClick={() => Web3Wrapper._getBalance()}>GET BALANCE</button>
            </div>}
        </div>
    );
}