
import React, { useEffect, useState } from "react";
import Web3Test from '../utilities/web3.test';

import "./app.scss";

export default function App() {
    const [number, setNumber] = useState(null);
    const [lastSender, setLastSender] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [successfullInitialization, setSuccessfullInitialization] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [funds, setFunds] = useState(null);
    const [newValue, setNewValue] = useState("");
 
    useEffect(() => {
        if(!initialized) {
            Web3Test._initialization()
                .then(res =>
                    {
                        setInitialized(true);
                        setSuccessfullInitialization(res.success);
                        setErrorMessage(res.errorMessage);
                    }).then(refreshNumber).catch(console.log);
        }
    }, [initialized]);

    const sendToSmartContract = () => {
        Web3Test._setNumber(newValue).then(refreshNumber).then(console.log).catch(console.log);
    }

    const refreshNumber = () => {
        Web3Test._getNumberSelected().then(setNumber);
        Web3Test._getLastSender().then(setLastSender);
        Web3Test._getCurrentUserBalance().then(setFunds);
    }
 
    return(
        <div>
                {initialized && <>
                     {successfullInitialization ?
                     <>
                     <h1>TESTING</h1>
                     <br />
                     <h2>current number {number ? number : ""}</h2>
                     <br />
                     <h2>last sender {lastSender ? lastSender : ""}</h2>
                     <br />
                     <h2>current user {Web3Test._userAddress}</h2>
                     <br />
                     <h2>balance {funds}</h2>
                     <br />
                     <button onClick={refreshNumber}>refresh</button>
                     <br />
                     <input value={newValue} onChange={e => setNewValue(e.target.value)}></input><button onClick={sendToSmartContract}>set</button>
                     </>
                     : <h1>{errorMessage}</h1>}
                 </> }
        </div>
    )
 }
 
