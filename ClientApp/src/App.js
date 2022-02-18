import React from "react";
import { Toaster } from 'react-hot-toast';
import BookChaptersComp from "./components/BookChaptersComp";
import BooksComp from "./components/BooksComp";
import { Switch, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Switch>
                <Route path="/" exact
                    render={() => (
                        <BooksComp />
                    )}
                />
                <Route path="/:id"
                    render={() => (
                        <BookChaptersComp />
                    )}
                />
            </Switch>
            <Toaster position="bottom-center" reverseOrder={false} />
        </>
    );
}

export default App;
