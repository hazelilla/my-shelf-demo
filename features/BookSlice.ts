import {createSlice} from "@reduxjs/toolkit";

interface BookState {
    books: any[];
}

const initialState: BookState = {
    books: [],
}

export const bookSlice = createSlice({
    name: 'bookStore',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books = [...state.books, action.payload]
        },

        removeBook: (state, action) => {
            const index = state.books.findIndex((book) => book.code === action.payload.code);

            let newShelf = [...state.books];
            if (index >= 0) {
                newShelf.splice(index, 1)
            } else {
                console.warn('cant remove product with id:', action.payload.code);
            } 
            state.books = newShelf;
        },

        emptyShelf: (state, action) => {
            state.books = state.books.filter((item) => item.code !== action.payload.code);
            state.books = [];
        }   
    }
})


export const {addBook, removeBook, emptyShelf} = bookSlice.actions
export const getBook = (state: any, code:any) => state.bookStore.books.find((item: { code: any; }) => item.code === code);
export const getBooks = (state: any) => state.books.books;
export default bookSlice.reducer;