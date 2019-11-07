import React, { useEffect, useCallback } from "react";
import web3Wrapper from '../utilities/web3Wrapper';

import { AppState } from '../common/enums';
import { useAppState, useAppData, useAnimations, usePortal } from "../entities"; 

import Header from './header/header';
import Board from './board/board';
import Result from './portal/result/result';
import CurrentBetDashboard from "./currentBetDashboard/currentBetDashboard";
import PreviousBetDashboard from "./previosBetDashboard/previousBetDashboard";
import Portal from "./portal/portal";

import "./app.scss";

export default function App() {
    const [appState, { setAppState, setErrorMessage, setUserAddress }] = useAppState();
    const [animations , { toggleSpinResultAnimation, toggleWarningAnimation }] = useAnimations();
    const [portal, { openPortal }] = usePortal();
    const [appData, {
        setAmounts, 
        setSelectedIDs,
        refreshAllData
    }] = useAppData();

    useEffect(() => {
        web3Wrapper._initialization(eventResultCallBack, appState.selectedUnit.value, setUserAddress)
            .then(res =>
            {
                if(!res.success) {
                    setAppState(AppState.ErrorWhenInitializing);
                    setErrorMessage(res.errorMessage);
                    return 
                } 
                else if (res.errorMessage){
                    setAppState(AppState.SuccessfulInitialization);
                    openPortal({
                        showPortal: true,
                        portalContent: res.errorMessage,
                        portalTitle: "Wrong network!"
                    });
                    return    
                }
                refreshAllData(setAppState);
            }).catch(err => {
                setAppState(AppState.ErrorWhenInitializing);
                setErrorMessage(err.message);
                console.error(err);   
            });
    }, []);

    const eventResultCallBack = useCallback (async (err, ev) => {
        if(err){
            console.log(err);
        }
        else {
            toggleSpinResultAnimation(false);
            const spin = web3Wrapper._resultEventMapper(ev.returnValues);
            openPortal({
                showPortal: true,
                portalContent: <Result resultData={spin} />,
                portalTitle: "Your transaction is processed!"
            });
            refreshAllData();
        }  
    });

    const onSelection = useCallback((newID) => {
        if(!appData.currentSelectedIDs.includes(newID) && appData.currentSelectedIDs.length < 4){
            setSelectedIDs([...appData.currentSelectedIDs, newID]);
            setAmounts([...appData.currentSelectedAmounts, "1"]);          
        }
        if(appData.currentSelectedIDs.length == 4){
            toggleWarningAnimation(true);
        }
    });

    const spinWheel = useCallback(() => {
        web3Wrapper._placeBet(
            appData.currentSelectedIDs, 
            appData.currentSelectedAmounts, 
            () => toggleSpinResultAnimation(true));
        setAmounts([]);
        setSelectedIDs([]);
    });

    return(
        <div className="app">
            <Portal />             
                {!(appState.intializationState == AppState.IsNotInitialized) && <>
                    <Header />
                    <div className="not-supported-message">Application is not supported for mobile devices</div>
                    <div className="app-body">
                    {appState.intializationState == AppState.SuccessfulInitialization ?  
                    <>                 
                        <Board onSelection={onSelection} />
                        <CurrentBetDashboard spinWheel={spinWheel} />
                        <PreviousBetDashboard />
                    </> : <h1>{appState.errorMessage}</h1>}
                    </div>
                 </> }
        </div>
    )
 }
 
