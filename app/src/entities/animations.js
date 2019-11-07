export const initialState = {
    warningAnimation: false,
    spinResultAnimation: false
};

export const toggleWarningAnimation = animations => (shouldShow) => {
    animations.state.setState({ ...animations.state, warningAnimation: shouldShow });
} 

export const toggleSpinResultAnimation = animations => (shouldShow) => {
    animations.state.setState({ ...animations.state, spinResultAnimation: shouldShow });
}