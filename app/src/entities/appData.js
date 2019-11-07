import web3Wrapper from "../utilities/web3Wrapper";
import { AppState } from "../common/enums";

export const initialState = {
    lastSpins: [],
    currentSelectedIDs: [],
    currentSelectedAmounts: [],
    userBalance: 0,
    refreshInProgress: false
};

export const refreshAllData = appData => async (setAppState) => {
    appData.setState({ 
        ...appData.state, 
        refreshInProgress: true, 
        lastSpins: [] 
    });

    const balance = await web3Wrapper._getCurrentUserBalance();
    const lastSpins = await web3Wrapper._getLastSpins();

    await appData.setState({ 
        ...appData.state, 
        refreshInProgress: false, 
        lastSpins: lastSpins, 
        userBalance: balance 
    });
    
    if(setAppState) { setAppState(AppState.SuccessfulInitialization); }
}

export const removeCurrentSelection = appData => index => {
    appData.state.currentSelectedAmounts.splice(index, 1);
    appData.state.currentSelectedIDs.splice(index, 1);
    appData.setState({ 
        ...appData.state, 
        currentSelectedAmounts: [...appData.state.currentSelectedAmounts],
        currentSelectedIDs: [...appData.state.currentSelectedIDs]
    });
}

export const updateCurrentSelectionSpinAmounts = appData => (newAmount, index) => {
    appData.state.currentSelectedAmounts[index] = newAmount;
    appData.setState({ ...appData.state, currentSelectedAmounts: [...appData.state.currentSelectedAmounts] });
}

export const setAmounts = appData => newAmounts => {
    appData.setState({ ...appData.state, currentSelectedAmounts: newAmounts });
}

export const setSelectedIDs = appData => newSelections => {
    appData.setState({ ...appData.state, currentSelectedIDs: newSelections });
}