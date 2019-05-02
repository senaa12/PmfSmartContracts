
import React, { useEffect, useState } from "react";
import Web3Wrapper from '../utilities/web3Wrapper';
import Header from './header/header';
import BoardBase from './board/boardBase';

import { AppState } from '../common/enums'; 
import "./app.scss";

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
    const pushToSelected = (newID) => {
        let current = selectedIDs;
        current.push(newID);
        setSelectedIDs(current);
    }

    const [newAmount, setNewAmount] = useState(1);

    const send = () => {
        Web3Wrapper._placeBet(selectedIDs, [newAmount]).then(console.log).catch(console.log);
    }

    const call = () => {
        Web3Wrapper._getLastSpinResults().then(console.log).catch(console.log);
    }
    return(
        <div>
                {!(appState == AppState.IsNotInitialized) && <>
                    <Header />
                     {appState == AppState.SuccessfulInitialization ?                   
                        <div className="body">
                        <BoardBase onSelection={pushToSelected}/>
                        <h1>TESTING</h1>
                        <br />
                        <input value={newAmount} onChange={e => setNewAmount(e.target.value)} />
                        <br />
                        <button onClick={send} >posalji</button><button onClick={call} >rez</button>
                        </div>
                     : <h1>{errorMessage}</h1>}
                 </> }
        </div>
    )
 }
 
