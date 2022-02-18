import React, { useEffect, useState } from "react";
import * as endpointService from "../services/endpoint.service";
import Loader from "./loader/Loader";
import {
    MDBContainer,
    MDBBtn,
    MDBTypography,
} from 'mdb-react-ui-kit';
import { useHistory } from 'react-router-dom';

export default function BooksComp() {
    const history = useHistory();

    const [searchBookForm, setSearchBookForm] = useState('');
    const [books, setBooks] = useState([]);
    const [searchBooks, setSearchBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await getBooks();
        })();
    }, []);

    const getBooks = async () => {
        var response = await endpointService.getBooksData();
        setBooks(response.docs);
        setSearchBooks(response.docs);
        setLoading(false);
    }

    const handleInputChange = (e) => {
        if (e.target.value.length === 0) {
            setSearchBooks(books);
        }
        setSearchBookForm(e.target.value);
	};

    const filterBooks = (e) => {
        e.preventDefault();
        setSearchBooks(searchBooks.filter(function (item) {
            return item.name.toLowerCase().includes(searchBookForm.toLowerCase());
        }));
    }

    const resetFilterBooks = (e) => {
        e.preventDefault();
        setSearchBooks(books);
        setSearchBookForm('');
    }

    const seeChapters = (bookId) => {
        history.push(`/${bookId}`)
    }

    if (loading === false) {
        return (
            <>
                <div className="container col-md-10 rounded mt-5 mb-5">
                    <h4 className="d-flex justify-content-center mt-3 mb-4 display-5">Books</h4>
                    <MDBContainer fluid className="mb-4">
                        <form className='d-flex input-group w-auto'>
                            <input type='search' value={searchBookForm} onChange={handleInputChange} className='form-control' placeholder='Search chapters by name' aria-label='Search' />
                            <div className="ml-4">
                                <MDBBtn color='primary' onClick={filterBooks}>Search</MDBBtn>
                            </div>
                            <div className="ml-4">
                                <MDBBtn color='primary' onClick={resetFilterBooks}>Reset Filter</MDBBtn>
                            </div>
                        </form>
                    </MDBContainer>
                    <div className="row d-flex justify-content-center mb-1">
                        {
                            searchBooks.map((item) => {
                                return (
                                    <div className="row" key={item._Id}>
                                        <div className="col-md-10">
                                            <MDBTypography note noteColor="primary">
                                                <strong>{item.name}</strong>
                                            </MDBTypography>
                                        </div>
                                        <div className="col-md-2 d-flex justify-content-end mb-3">
                                            <MDBBtn onClick={() => seeChapters(item._Id)}>
                                                See Book Chapters
                                            </MDBBtn>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <Loader />
        );
    }
}
