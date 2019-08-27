export const initialState = {
    warningAnimation: false,
    spinResultAnimation: false
};

export const toggleWarningAnimation = animations => (shouldShow) => {
    animations.setState({ ...animations, warningAnimation: shouldShow });
} 

export const toggleSpinResultAnimation = animations => (shouldShow) => {
    animations.setState({ ...animations, spinResultAnimation: shouldShow });
}