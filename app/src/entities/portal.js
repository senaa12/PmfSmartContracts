export const initialState = {
    showPortal: false,
    portalTitle: "",
    portalContent: null
};

export const openPortal = portal => portalData => {
    portal.state.setState({...portalData});
}

export const closePortal = portal => () => {
    portal.state.setState({ ...initialState, showPortal: false });
}