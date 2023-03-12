import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import config from '../../config/configExample';

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        margin: '0 auto',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const CreateUpdateBook = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const [book, setBook] = useState({ name: '', author: '', genre: '' });

    const handleSave = async () => {
        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `${config.BASE_URL}/book/${id}` : `${config.BASE_URL}/book/`;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book), // serialize book to JSON
            });

            if (response.ok) {
                history.push('/books');
            } else {
                console.error(response);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleChange = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const handleCancel = () => {
        history.push('/books');
    };

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField name="name" label="Name" value={book.name} onChange={handleChange} />
            <TextField name="author" label="Author" value={book.author} onChange={handleChange} />
            <TextField name="genre" label="Genre" value={book.genre} onChange={handleChange} />
            <Button variant="contained" color="primary" onClick={handleSave}>
                Save
            </Button>
            <Button variant="contained" onClick={handleCancel}>
                Cancel
            </Button>
        </form>
    );
};

export default CreateUpdateBook;
