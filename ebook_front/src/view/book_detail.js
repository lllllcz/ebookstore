import WebTop from "../components/web_top";
import BookInfo from '../components/book_info'
import React from "react";
import { withRouter } from "react-router-dom";
import {getBook} from "../services/bookService";


class BookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: []
    }

  }

  componentDidMount(){
    // console.log(this.props.match.params.bookId);
    // const bookId = this.props.match.params.bookId;

    // const query = this.props.location.search;
    // const arr = query.split('&');
    // const bookId = arr[0].substr(4);
    const result = new URLSearchParams(this.props.location.search);
    const bookId = result.get('id');
    // window.alert(bookId);
    getBook(bookId, (data) => {this.setState({book: data})});
  }

  render() {
    console.log(this.state.book);
    return (
      <div className="BookDetail">
        <WebTop user={this.props.userName} userType={this.props.userType} />
        <BookInfo userId={this.props.userId} book={this.state.book}/>
      </div>
    );
  }
}

export default withRouter(BookDetail);