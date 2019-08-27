export const initialState = {
    lastSpins: [],
    currentSelectedIDs: [],
    currentSelectedAmounts: [],
    userBalance: 0
};

export const setLastSpins = appData => newValue => {
    appData.setState({ ...appData, lastSpins: newValue });
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
    appData.setState({ ...appData, currentSelectedAmounts: appData.state.state.currentSelectedAmounts });
}

export const setAmounts = appData => newAmounts => {
    appData.setState({ ...appData, currentSelectedAmounts: newAmounts });
}

export const setSelectedIDs = appData => newSelections => {
    appData.setState({ ...appData, currentSelectedIDs: newSelections });
}

export const setUserBalance = appData => newBalance => {
    appData.setState({ ...appData, userBalance: newBalance });
}