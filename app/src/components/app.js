
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
    const [web3Wrapper, setWeb3Wrapper] = useState(undefined);

    useEffect(() => {
        if(!web3Wrapper) {
            setWeb3Wrapper(new Web3Wrapper());
        }
    }, [web3Wrapper]);

    useEffect(() => {
        if(appState == AppState.IsNotInitialized && web3Wrapper) {
            web3Wrapper._initialization()
                .then(res =>
                    {
                        if(!res.success) {
                            setAppState(AppState.ErrorWhenInitializing);
                            setErrorMessage(res.errorMessage);
                        }
                        else {
                            setAppState(AppState.SuccessfulInitialization);
                            getUserBalance();
                            getLastSpins();
                        }
                    }).catch(err => {
                        setAppState(AppState.ErrorWhenInitializing);
                        setErrorMessage("Something weird happend!? Check ConsoleLog for details");
                        console.error(err);   
                    });
        }
    }, [appState, web3Wrapper]);


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
        setSelectedLabels([]);
        web3Wrapper._placeBet(selectedIDs, amounts);
    }

    const [lastSpins, setLastSpins] = useState([]);
    const getLastSpins = () => {
        getUserBalance();
        web3Wrapper._getLastSpins().then(setLastSpins).catch(console.error);
    }

    const [userBalance, setUserBalance] = useState(0);
    const getUserBalance = () => {
        web3Wrapper._getCurrentUserBalance().then(setUserBalance).catch(console.error);
    }

    return(
        <div>             
                {!(appState == AppState.IsNotInitialized) && <>
                    <Header web3Wrapper={web3Wrapper} userBalance={userBalance} getUserBalance={getUserBalance} />
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
 
