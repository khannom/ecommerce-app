import { UserActionTypes } from './user.types'

const INITIAL_STATE = {
    currentUser: null
};


//las actions llegan a todos los reducers, por eso necesitamos un case default en el que
//no se va a modificar nuestro state,
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;
    }
};

export default userReducer;