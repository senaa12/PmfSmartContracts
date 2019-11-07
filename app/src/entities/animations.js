export const initialState = {
    warningAnimation: false,
    spinResultAnimation: false
};

export const toggleWarningAnimation = animations => (shouldShow) => {
    animations.setState({ ...animations.state, warningAnimation: shouldShow });
} 

export const toggleSpinResultAnimation = animations => (shouldShow) => {
    animations.setState({ ...animations.state, spinResultAnimation: shouldShow });
}