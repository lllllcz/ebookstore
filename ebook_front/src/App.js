import React from 'react';
import { BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {history} from "./utils/history";

import Login from "./view/login";
import Signup from "./view/signup";
import MainPage from "./view/main";
import BookDetail from "./view/book_detail";
import Cart from "./view/cart";
import Orders from "./view/order";

import PrivateRoute from "./PrivateRoute";
import LoginRoute from "./LoginRoute";
import MUPage from "./view/manage_user";
import ManageBook from "./view/manage_book";
import StatisticPage from "./view/statistic";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <PrivateRoute path="/detail" component={BookDetail} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/orders" component={Orders} />
          <LoginRoute path="/login" component={Login} />
          <LoginRoute path="/signup" component={Signup} />
          <PrivateRoute path="/manage/users" component={MUPage} />
          <PrivateRoute path="/manage/books" component={ManageBook} />
          <PrivateRoute path='/statistic' component={StatisticPage} />
          <PrivateRoute exact path="/" component={MainPage} />
          <Redirect from="/*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
