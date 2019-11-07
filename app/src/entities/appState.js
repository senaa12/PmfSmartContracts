import { AppState, Units } from "../common/enums";
import web3Wrapper from "../utilities/web3Wrapper";

export const initialState = {
    intializationState: AppState.IsNotInitialized,
    errorMessage: "",
    selectedUnit: Units.Ether,
    userAddress: ""
};

export const setAppState = appState => newState => {
    appState.setState({ ...appState.state, intializationState: newState });
};

export const setErrorMessage = appState => newMessage => {
    appState.setState({ ...appState.state, errorMessage: newMessage });
}

export const changeSelectedUnit = appState => newUnit => {
    web3Wrapper._setUnit(newUnit.value)
    appState.setState({ ...appState.state, selectedUnit: newUnit });
}

export const setUserAddress = appState => address => {
    appState.setState({ ...appState.state, userAddress: address });
}