import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchWrapper } from '_helpers';

 
const name=""
// create card slice
const cardName = 'card';
const initialCardState = createCardInitialState();
const extraCardActions = createCardExtraActions();
const extraCardReducers = createCardExtraReducers();
const Cardslice = createSlice({ name: cardName, initialState: initialCardState,extraReducers:extraCardReducers  });


const cardNamesend = 'cardsend';
const initialCardStatesend = createCardInitialStatesend();
const extraCardActionssend = createCardExtraActionssend();
const extraCardReducerssend = createCardExtraReducerssend();
const Cardslicesend = createSlice({ name: cardNamesend, initialState: initialCardStatesend, extraReducers: extraCardReducerssend });




 

//export card
export const cardActions = { ...Cardslice.actions, ...extraCardActions };
export const cardReducer = Cardslice.reducer;

//card send
export const cardActionssend = { ...Cardslicesend.actions, ...extraCardActionssend };
export const cardReducersend = Cardslicesend.reducer;



// implementation
 

//card
function createCardInitialState() {
    return {
        cards: []
    }
}

function createCardExtraActions() {
    const baseUrl = `${process.env.REACT_APP_API_URL}/cards?limit=100`;

    return {
        getAllCard: getAllCard()
    };    

    function getAllCard() {
        return createAsyncThunk(
            `${cardName}`,
            async () => await fetchWrapper.get(baseUrl)
        );

    }
}

function createCardExtraReducers() {
    return {
        ...getAllCard()
    };

    function getAllCard() {
        var { pending, fulfilled, rejected } = extraCardActions.getAllCard;
        return {
            [pending]: (state) => {
                state.cards = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.cards = action.payload;
            },
            [rejected]: (state, action) => {
                state.cards = { error: action.error };
            }
        };
    }
}




//card send
function createCardInitialStatesend() {
    return {
        cardres: {}
    }
}

function createCardExtraActionssend() {
    const baseUrl = `${process.env.REACT_APP_API_URL}`;

    return {
        postCard:postCard()
    };    
  
    function postCard() {
        return createAsyncThunk(
            `${name}/login`,
            async ({ number, expiry, name }) => await fetchWrapper.post(`${baseUrl}/cards`,
                { name, "cardExpiration":expiry,"cardHolder":name,"cardNumber":number,"category": "VISA"})
        );
    }

}

function createCardExtraReducerssend() {
    return {
        ...postCard()
    };

    function postCard() {
        var { pending, fulfilled, rejected } = extraCardActionssend.postCard;
        return {
            [pending]: (state) => {
                state.user = { loading: true };
            },
            [fulfilled]: (state, action) => {
                state.user = action.payload;
            },
            [rejected]: (state, action) => {
                state.user = { error: action.error };
            }
        };
    }
}


