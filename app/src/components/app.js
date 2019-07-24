import React, { useEffect, useState } from "react";
import Web3Wrapper from '../utilities/web3Wrapper';
import Header from './header/header';
import BoardBase from './board/boardBase';

import { AppState, Units } from '../common/enums'; 
import "./app.scss";
import CurrentBetDashboard from "./currentBetDashboard/currentBetDashboard";
import PreviousBetDashboard from "./previosBetDashboard/previousBetDashboard";
import Portal from "./portal/portal";

export default function App() {
    const [appState, setAppState] = useState(AppState.IsNotInitialized);
    const [errorMessage, setErrorMessage] = useState("");
    const [web3Wrapper, setWeb3Wrapper] = useState(undefined);
    const [selectedUnit, changeSelectedUnit] = useState(Units.Ether);

    const refreshAllData = async () => {
        getUserBalance();
        await getLastSpins();
    }

    useEffect(() => {
        if(web3Wrapper){
            web3Wrapper._setUnit(selectedUnit.value);
            refreshAllData();
        }
    }, [selectedUnit]);

    useEffect(() => {
        setWeb3Wrapper(new Web3Wrapper());
    }, []);

    useEffect(() => {
        if(appState == AppState.IsNotInitialized && web3Wrapper) {
            web3Wrapper._initialization(eventCallBack, selectedUnit.value)
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

    const [isPortalOpen, openPortal] = useState(false); 
    const eventCallBack = async (err, ev) => {
        if(err){
            console.log(err);
        }
        else {
            await refreshAllData();
            openPortal(true);
        }  
    }

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
    const getLastSpins = async () => {
        getUserBalance();
        await web3Wrapper._getLastSpins().then(setLastSpins).catch(console.error);
    }

    const [userBalance, setUserBalance] = useState(0);
    const getUserBalance = () => {
        web3Wrapper._getCurrentUserBalance().then(setUserBalance).catch(console.error);
    }

    return(
        <div className="app">
            <Portal isOpen={isPortalOpen} lastSpin={lastSpins[0]} openPortal={openPortal} />             
                {!(appState == AppState.IsNotInitialized) && <>
                    <Header 
                        web3Wrapper={web3Wrapper} 
                        userBalance={userBalance} 
                        getUserBalance={getUserBalance} 
                        selectedUnit={selectedUnit}
                        changeSelectedUnit={changeSelectedUnit}
                    />
                    <div className="app-body">
                    {appState == AppState.SuccessfulInitialization ?  
                    <>                 
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
                        <PreviousBetDashboard 
                            refreshPreviousBets={getLastSpins} 
                            lastSpins={lastSpins} 
                            selectedUnit={selectedUnit}
                        />
                    </> : <h1>{errorMessage}</h1>}
                    </div>
                 </> }
        </div>
    )
 }
 
