const initialState = {
    token: (new Date()).getTime(),
};

const systemReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_SYSTEM_VARIABLE':
            return {...state, [action.payload.prop]: action.payload.value};
        default:
            return state;
    }
};


export default systemReducer;
