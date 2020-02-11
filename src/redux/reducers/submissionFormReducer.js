const submissionFormReducer = (state = {}, action) => {
    switch (action.type){
        case 'SET_SUBMISSION_FORM':
            return action.payload;
        case 'UPDATE_SUBMISSION_FORM':
            state[action.payload.key] = action.payload.value;
            return state;
        case 'CLEAR_SUBMISSION_FORM':
            return {};
        default:
            return state;
    }
}

export default submissionFormReducer;