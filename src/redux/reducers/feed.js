const initialState = {
    entities: [],
    loading: false
};

const feedReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SAVE_ENTITIES':
            return {...state, [action.payload.prop]: action.payload.value};
        case 'SAVE_FEED_PROPERTY':
            return {...state, [action.payload.prop]: action.payload.value};
        case 'UPDATE_ENTITIES_LIST':
            const newLiest = state.entities.concat(action.payload.value);
            return {
                ...state,
                newLiest,
            };
        case 'GET_ENTITY':
            return state.map(item => {
                if ([action.payload.prop] === action.payload.value) {
                    return {...item};
                }
            });
        case 'UPDATE_ENTITY_LIKES':
            state.entities.map((item) => {
                if (item.id == action.payload.entityId) {
                    item.likes_number = parseInt(action.payload.value);
                    // item.is_liked = !item.is_liked;
                }
            });
            return state;
        case 'UPDATE_ENTITY_LIKES_SOCKETS':
            state.entities.map((item) => {
                if (item.id == action.payload.entityId) {
                    item.likes_number = parseInt(action.payload.value.total);
                    item.is_liked = action.payload.value.is_liked;
                }
            });
            return state;
        default:
            return state;
    }
};

export default feedReducer;
