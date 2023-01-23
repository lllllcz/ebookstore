import React from "react";
import * as userService from "./services/userService"
import {Route, Routes} from "react-router";
import LoginView from "./views/login";
import BookView from "./views/book";
import MainView from "./views/main";
import NotFound from "./views/notFound";

class Protector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false,
      hasAuthed: false,
    };
  }

  checkAuth = (data) => {
    console.log(data);
    if (data.status >= 0) {
      this.setState({
        isAuthed: true,
        hasAuthed: true,
      });
    } else {
      localStorage.removeItem('user');
      this.setState({isAuthed: false, hasAuthed: true});
    }
  };


  componentDidMount() {
    userService.checkSession(this.checkAuth);
  }

  render() {
    if (!this.state.hasAuthed) return null;

    const ele1 = (
      <Routes>
        <Route path="/book" element={<BookView />} />
        <Route path="/" element={<MainView />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    );
    const ele2 = (
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<MainView />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    );
    return(
      (this.state.isAuthed) ? (ele1) : (ele2)
    );
  }

}
export default Protector;