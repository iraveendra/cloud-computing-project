import { createSlice } from '@reduxjs/toolkit';


const initialState = { widgets: [], isLoading: true, changed: false }
export const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        add: (state, action) => {
            const book = {
                widgetId: action.payload.widgetId,
                
            }
            state.books.push(book);
        },
        delete: (state) => {

        },
        update: (state, action) => {

        },
        getBooks: (state, action) => {
            state.books = action.payload.books;
            state.isLoading = false;
        },
    }

});


export const widgetActions = widgetSlice.actions

export default widgetSlice.reducer;