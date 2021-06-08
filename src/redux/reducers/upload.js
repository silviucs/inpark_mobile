const initialState = {
    selectedImageUri: '',
}

const uploadReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SAVE_UPLOAD_SELECTED_IMAGE':
            return { ...state, [action.payload.prop]: action.payload.value };
        default:
            return state;
    }
};

export default uploadReducer;
