
import React, { useEffect, useState } from "react";
import Web3Wrapper from '../utilities/web3Wrapper';
import Header from './header/header';
import BoardBase from './board/boardBase';

import { AppState } from '../common/enums'; 
import "./app.scss";
import CurrentBetDashboard from "./currentBetDashboard/currentBetDashboard";
import PreviousBetsDashboard from "./previosBetsDashboard/previousBetsDashBoard";

export default function App() {
    const [appState, setAppState] = useState(AppState.IsNotInitialized);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if(appState == AppState.IsNotInitialized) {
            Web3Wrapper._initialization()
                .then(res =>
                    {
                        if(!res.success) {
                            setAppState(AppState.ErrorWhenInitializing);
                            setErrorMessage(res.errorMessage);
                        }
                        else {
                            setAppState(AppState.SuccessfulInitialization);
                        }
                    }).catch(err => {
                        setAppState(AppState.ErrorWhenInitializing);
                        setErrorMessage("Something weird happend!? Check ConsoleLog for details");
                        console.log(err);   
                    });
        }
    }, [appState]);


    const [selectedIDs, setSelectedIDs] = useState([]);
    const [newAmount, setNewAmount] = useState([]);
    
    const pushToSelected = (newID) => {
        if(!selectedIDs.includes(newID)){
            setSelectedIDs([...selectedIDs, newID]);
            setNewAmount([...newAmount, 1]);          
        }
    }

    const spinWheel = () => {
        Web3Wrapper._placeBet(selectedIDs, newAmount).then(console.log).catch(console.log);
    }

    const call = () => {
        Web3Wrapper._getLastSpins().then(console.log).catch(console.log);
    }

    return(
        <div>
                {!(appState == AppState.IsNotInitialized) && <>
                    <Header />
                     {appState == AppState.SuccessfulInitialization ?                   
                        <div className="row body">
                        <BoardBase onSelection={pushToSelected}/>
                        <CurrentBetDashboard selections={selectedIDs} spinWheel={spinWheel}/>
                        <PreviousBetsDashboard refreshPreviousBets={call}/>
                        </div>
                     : <h1>{errorMessage}</h1>}
                 </> }
        </div>
    )
 }
 
