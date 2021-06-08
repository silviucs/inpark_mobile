const initialState = {
    loggedIn: false,
    user: {}
};

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SAVE_LOGIN_CREDENTIALS':
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};

export default loginReducer;
