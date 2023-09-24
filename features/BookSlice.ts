import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    books: [],
}

export const bookSlice = createSlice({
    name: 'bookStore',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books = [...state.books, action.payload]
        }
    }
})


export const {addBook} = bookSlice.actions
export const getBook = (state: any, id:any) => state.bookStore.books.find((item: { id: any; }) => item.id === id);
export const getBooks = (state: any) => state.books.books;
export default bookSlice.reducer;