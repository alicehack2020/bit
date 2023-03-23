import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

// create slice
const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// create card slice
const cardName = 'card';
const initialCardState = createCardInitialState();
const extraCardActions = createCardExtraActions();
const extraCardReducers = createCardExtraReducers();
const Cardslice = createSlice({ name: cardName, initialState: initialCardState, extraReducers: extraCardReducers });




// exports
export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

//export card
export const cardActions = { ...Cardslice.actions, ...extraCardActions };
export const cardReducer = Cardslice.reducer;





// implementation
function createInitialState() {
    return {
        users: {}
    }
}

function createExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    return {
        getAll: getAll()
    };    

    function getAll() {
        return createAsyncThunk(
            `${name}/getAll`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createExtraReducers() {
    return {
        ...getAll()
    };

    function getAll() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload;
            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
            }
        };
    }
}


//card
function createCardInitialState() {
    return {
        card: {}
    }
}

function createCardExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/cards`;

    return {
        getAllCard: getAllCard()
    };    

    function getAllCard() {
        return createAsyncThunk(
            `/cards`,
            async () => await fetchWrapper.get(baseUrl)
        );
    }
}

function createCardExtraReducers() {
    return {
        ...getAllCard()
    };

    function getAllCard() {
        var { pending, fulfilled, rejected } = extraActions.getAll;
        return {
            [pending]: (state) => {
                state.users = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.users = action.payload;
            },
            [rejected]: (state, action) => {
                state.users = { error: action.error };
            }
        };
    }
}




