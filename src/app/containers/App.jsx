import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch,} from 'react-router-dom';
import IntlProvider from 'components/IntlProvider';
import Header from 'components/Header';
import PageInitial from 'pageProviders/Initial';
import PageLogin from 'pageProviders/Login';
import * as PAGES from 'constants/pages';
import BookList from "../../pages/Book/BookList";

import {fetchUser,} from '../actions/user';
import CreateUpdateBook from "../../pages/Book/CreateUpdateBook";

const App = () => {
  const [state, setState] = useState({
    componentDidMount: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    setState(prevState => ({
      ...prevState,
      componentDidMount: true,
    }));
  }, []);

  return (
    <BrowserRouter>
      <IntlProvider>
        <Header />
        {state.componentDidMount && (
            <Switch>
              <Route path={`/books/create`}>
                <CreateUpdateBook/>
              </Route>
              <Route path={`/books/edit/:id`}>
                <CreateUpdateBook/>
              </Route>
              <Route path={`/books`}>
                <BookList/>
              </Route>
              <Route path={`/${PAGES.LOGIN}`}>
                <PageLogin />
              </Route>
              <Route path={`/${PAGES.INITIAL}`}>
                <PageInitial />
              </Route>
              <Redirect from="*" to={`/${PAGES.INITIAL}`} />
            </Switch>
        )}
      </IntlProvider>
    </BrowserRouter>
  );
};

export default App;
