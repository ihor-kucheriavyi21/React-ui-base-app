import React, {useEffect, useState} from 'react';
import config from "../../config/configExample";
import {useHistory} from 'react-router-dom';

import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

const BookList = () => {
    const history = useHistory();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const url = config.BASE_URL + "/book/all";
                const response = await fetch(url);
                const books = await response.json();
                setBooks(books);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, []);


    const handleEdit = (id) => {
        console.log(`Edit book with ID ${id}`);
        history.push(`/books/edit/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const url = config.BASE_URL + "/book/" + id;

            await fetch(url, {method: 'DELETE'});
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error(error);
        }

    };


    return (
        <>
            <Button
                onClick={() => history.push('/books/create')}
                variant="contained"
                color="primary"
                style={{marginBottom: "20px"}}>
                New Book
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="book table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.genre}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleEdit(book.id)}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        style={{marginRight: "10px"}}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleDelete(book.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default BookList;
