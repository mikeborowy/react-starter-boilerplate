const types = {
    LOADING_STARTED: 'LOADING_STARTED',
    LOADING_END: 'LOADING_END',
    LOADING_ERROR: 'LOADING_ERROR',
    LOADING_PENDING: 'LOADING_PENDING'
};

/** ACTIONS START */
export const onLoadingStart = (text) => ({type: types.LOADING_STARTED, text});
export const onLoadingEnd = (text) => ({type: types.LOADING_END, text});
export const onLoadingError = (error) => ({type: types.LOADING_ERROR, error});
export const onLoadingPending = (text) => ({type: types.LOADING_PENDING, text});
/** ACTIONS END */

/** REDUCER START */
const initialState = {
    loaders: 0,
    defaultText: "Loading, please wait...",
    text: "",
    errors: []
};

export const preloader = (state = initialState, action) => {
    let updatedPreloader = null;

    switch (action.type) {
        case types.LOADING_STARTED:

            updatedPreloader = {
                loaders: (state.loaders + 1),
                text: action.text
            };
            return Object.assign({}, state, updatedPreloader);

        case types.LOADING_END:

            updatedPreloader = {
                loaders: state.loaders != 0 ? (state.loaders - 1) : state.loaders,
                text: action.text != null ? action.text : state.defaultText
            };
            return Object.assign({}, state, updatedPreloader);

        case types.LOADING_ERROR:

            updatedPreloader = {
                loaders: state.loaders != 0 ? (state.loaders - 1) : state.loaders,
                text: action.error,
                errors:  [
                    ...state.errors.slice(0, state.errors.length),
                    action.error,
                    ...state.errors.slice(state.errors.length)]
            };

            return Object.assign({}, state, updatedPreloader);

        default:
            return state;
    }
};
/** REDUCER END */