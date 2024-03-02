import { bookActions } from './bookSlice';
import { uiActions } from './uiSlice';

// to fetch all books 
export const fetchBooks = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch('/books');

            if (!response.ok) {
                // console.log(response.ok)
                throw new Error('Could not data!');
            }

            const data = await response.json();

            return data;
        }
        try {
            const booksData = await fetchData();
            console.log(booksData);
            dispatch(bookActions.getBooks({
                books: booksData
            }))
        } catch (error) {
            console.log(error);
        }

    };

}
// to upload a book
export const uploadBook = (bookData) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Uploading...',
            message: 'Uploading your book',
            show: true
        }));
        const sendRequest = async () => {
            const response = await fetch('/book', {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookData)
            });
            if (!response.ok) {
                throw new Error("uploading failed");
            }
            else {
                const data = await response.json();
                console.log(data);
                // Write the fetch logic here to be in sync or assign the book id which was returned in data
                dispatch(bookActions.add({
                    bookId: data,
                    bookTitle: bookData.bookTitle,
                    author: bookData.author,
                    rating: bookData.rating,
                    category: bookData.category,
                }))
                alert("added book successfully")
            }
        }
        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Successfully uploaded',
                show: true
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Uploading failed',
                show: true
            }));
        }

    }

}

export const deleteBook = (data) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Deleting...',
            message: 'Deleting book',
            show: true,
        }))
        const sendData = async () => {
            const response = await fetch('/book', {
                method: "DELETE",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ bookId: data }),

            });

            if (!response.ok) {
                throw new Error('Error occured');
            }
        }
        try {
            sendData();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success',
                message: 'Successfully Deleted',
                show: true,

            }))
            dispatch(fetchBooks());
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error',
                message: 'Deleting failed',
                show: true,
            }))
        }




    };
}

export const updateBook =(data)=>{
    return async (dispatch) =>{

        const sendUpdateRequest = async ()=>{

            const response = await fetch('/book',{
                method: "PUT",
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error("error occured");
            }
            else{
                // const data = await response.json();
                // dispatch(bookActions.update({
                //     bookId: data.bookId,
                //     bookTitle: data.bookTitle,
                //     author: data.author,
                //     category: data.category,
                // }))
                alert("updated successfully");
                 await dispatch(fetchBooks());
            }

        }

        try{
           await sendUpdateRequest();
        }
        catch(error){

        }


    }
}