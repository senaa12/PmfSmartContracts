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
        ...appData, 
        refreshInProgress: true, 
        lastSpins: [] 
    });

    const balance = await web3Wrapper._getCurrentUserBalance();
    const lastSpins = await web3Wrapper._getLastSpins();

    await appData.setState({ 
        ...appData, 
        refreshInProgress: false, 
        lastSpins: lastSpins, 
        userBalance: balance 
    });
    
    if(setAppState) { setAppState(AppState.SuccessfulInitialization); }
}

export const removeCurrentSelection = appData => index => {
    appData.state.state.currentSelectedAmounts.splice(index, 1);
    appData.state.state.currentSelectedIDs.splice(index, 1);
    appData.setState({ 
        ...appData, 
        currentSelectedAmounts: appData.state.state.currentSelectedAmounts,
        currentSelectedIDs: appData.state.state.currentSelectedIDs
    });
}

export const updateCurrentSelectionSpinAmounts = appData => (newAmount, index) => {
    appData.state.state.currentSelectedAmounts[index] = newAmount;
    appData.setState({ ...appData, currentSelectedAmounts: [...appData.state.state.currentSelectedAmounts] });
}

export const setAmounts = appData => newAmounts => {
    appData.setState({ ...appData, currentSelectedAmounts: newAmounts });
}

export const setSelectedIDs = appData => newSelections => {
    appData.setState({ ...appData, currentSelectedIDs: newSelections });
}