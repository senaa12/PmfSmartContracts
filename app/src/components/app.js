
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

    const eventCallBack = (err, ev) => {
        if(err){
            console.log(err);
        }
        else {
            const etherAmount = web3Wrapper._web3.utils.fromWei(ev.returnValues.amountWon.toString(), "ether");
            const winningBet = ev.returnValues.won;
            console.log(winningBet);
            console.log(etherAmount);
            alert(winningBet);
            refreshAllData();
        }  
    }   

    const refreshAllData = () => {
        getUserBalance();
        getLastSpins();
    }

    useEffect(() => {
        if(!web3Wrapper) {
            setWeb3Wrapper(new Web3Wrapper());
        }
    }, [web3Wrapper]);

    useEffect(() => {
        if(appState == AppState.IsNotInitialized && web3Wrapper) {
            web3Wrapper._initialization(eventCallBack)
                .then(res =>
                    {
                        if(!res.success) {
                            setAppState(AppState.ErrorWhenInitializing);
                            setErrorMessage(res.errorMessage);
                        }
                        else {
                            setAppState(AppState.SuccessfulInitialization);
                            refreshAllData();
                        }
                    }).catch(err => {
                        setAppState(AppState.ErrorWhenInitializing);
                        setErrorMessage("Something weird happend!? Check ConsoleLog for details");
                        console.error(err);   
                    });
        }
    }, [appState, web3Wrapper]);


    const [selectedIDs, setSelectedIDs] = useState([]);
    const [amounts, setAmounts] = useState([]);
    
    const onSelection = (newID) => {
        if(!selectedIDs.includes(newID) && selectedIDs.length < 6){
            setSelectedIDs([...selectedIDs, newID]);
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
        setAmounts([...amounts]);
        setSelectedIDs([...selectedIDs]);
    }

    const spinWheel = () => {
        setAmounts([]);
        setSelectedIDs([]);
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
                            selectedIDs={selectedIDs} 
                            amounts={amounts} 
                            spinWheel={spinWheel} 
                            updateSpinAmounts={updateSpinAmounts} 
                            removeSelection={removeSelection}
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
 
