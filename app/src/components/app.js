
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
                            getLastSpins();
                        }
                    }).catch(err => {
                        setAppState(AppState.ErrorWhenInitializing);
                        setErrorMessage("Something weird happend!? Check ConsoleLog for details");
                        console.log(err);   
                    });
        }
    }, [appState]);


    const [selectedIDs, setSelectedIDs] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [amounts, setAmounts] = useState([]);
    
    const onSelection = (newID, newIDLabel) => {
        if(!selectedIDs.includes(newID) && selectedIDs.length < 6){
            setSelectedIDs([...selectedIDs, newID]);
            setSelectedLabels([...selectedLabels, newIDLabel]);
            setAmounts([...amounts, 1]);          
        }
    }
    const updateSpinAmounts = (newAmount, index) => {
        amounts[index] = newAmount;
        setAmounts([...amounts]);
    }
    const removeSelection = (index) => {
        amounts.splice(index, 1);
        selectedIDs.splice(index, 1);
        selectedLabels.splice(index, 1);
        setAmounts([...amounts]);
        setSelectedLabels([...selectedLabels]);
        setSelectedIDs([...selectedIDs]);
    }

    const spinWheel = () => {
        setAmounts([]);
        setSelectedIDs([]);
        Web3Wrapper._placeBet(selectedIDs, amounts);
    }

    const [lastSpins, setLastSpins] = useState([]);
    const getLastSpins = () => {
        Web3Wrapper._getLastSpins().then(setLastSpins).catch(console.log);
    }

    return(
        <div>
                {!(appState == AppState.IsNotInitialized) && <>
                    <Header />
                     {appState == AppState.SuccessfulInitialization ?                   
                        <div className="row body">
                        <BoardBase 
                            onSelection={onSelection}
                        />
                        <CurrentBetDashboard 
                            selections={selectedIDs} 
                            amounts={amounts} 
                            spinWheel={spinWheel} 
                            updateSpinAmounts={updateSpinAmounts} 
                            removeSelection={removeSelection}
                            selectedLabels={selectedLabels}
                        />
                        <PreviousBetsDashboard 
                            refreshPreviousBets={getLastSpins} 
                            lastSpins={lastSpins} 
                        />
                        </div>
                     : <h1>{errorMessage}</h1>}
                 </> }
        </div>
    )
 }
 
