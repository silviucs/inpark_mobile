const initialState = {
    user: {},
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SAVE_LOGIN_STATE':
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};

export default userReducer;
