export const initialState = {
    showPortal: false,
    portalTitle: "",
    portalContent: null
};

export const openPortal = portal => portalData => {
    portal.setState({...portalData});
}

export const closePortal = portal => () => {
    portal.setState({ ...initialState, showPortal: false });
}