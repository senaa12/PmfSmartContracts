import { AppState, Units } from "../common/enums";
import web3Wrapper from "../utilities/web3Wrapper";

export const initialState = {
    intializationState: AppState.IsNotInitialized,
    errorMessage: "",
    selectedUnit: Units.Ether
};

export const setAppState = appState => newState => {
    appState.setState({ ...appState, intializationState: newState });
};

export const setErrorMessage = appState => newMessage => {
    appState.setState({ ...appState, errorMessage: newMessage });
}

export const changeSelectedUnit = appState => newUnit => {
    web3Wrapper._setUnit(newUnit.value)
    appState.setState({ ...appState, selectedUnit: newUnit });
}