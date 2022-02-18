import React, { useEffect, useState } from "react";
import {
    MDBBtn,
    MDBContainer,
    MDBTypography,
} from "mdb-react-ui-kit";
import * as endpointService from "../services/endpoint.service";
import Loader from "./loader/Loader";
import { useParams } from 'react-router-dom';

export default function BookChaptersComp(props) {
    const { id } = useParams();

    const [searchChapterForm, setSearchChapterForm] = useState('');
    const [chapters, setChapters] = useState([]);
    const [searchChapters, setSearchChapters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await getBookChapters();
        })();
    }, []);

    const getBookChapters = async () => {
        var response = await endpointService.getBookChapters(id);
        setChapters(response.docs);
        setSearchChapters(response.docs);
        setLoading(false);
    }

    const handleInputChange = (e) => {
        if (e.target.value.length === 0) {
            setSearchChapters(chapters);
        }
        setSearchChapterForm(e.target.value);
	}

    const filterChapters = (e) => {
        e.preventDefault();
        setSearchChapters(searchChapters.filter(function (item) {
            return item.chapterName.toLowerCase().includes(searchChapterForm.toLowerCase());
        }));
    }

    const resetFilterChapters = (e) => {
        e.preventDefault();
        setSearchChapters(chapters);
        setSearchChapterForm('');
    }

    if (loading === false) {
        return (
            <div className="container col-md-10 rounded mt-5 mb-5">
                <h4 className="d-flex justify-content-center mt-3 mb-4 display-5">Book Chapters</h4>
                <MDBContainer fluid className="mb-4">
                    <form className='d-flex input-group w-auto'>
                        <input type='search' value={searchChapterForm} onChange={handleInputChange} className='form-control' placeholder='Search chapters by name' aria-label='Search' />
                        <div className="ml-4">
                            <MDBBtn color='primary' onClick={filterChapters}>Search</MDBBtn>
                        </div>
                        <div className="ml-4">
                            <MDBBtn color='primary' onClick={resetFilterChapters}>Reset Filter</MDBBtn>
                        </div>
                    </form>
                </MDBContainer>
                <div className="row d-flex justify-content-center mb-1">
                    {
                        searchChapters.map((item) => {
                            return (
                                <div className="row" key={item._Id}>
                                    <div className="">
                                        <MDBTypography note noteColor="primary">
                                            <strong>{item.chapterName}</strong>
                                        </MDBTypography>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    } else {
        return (
            <Loader />
        );
    }
}
