import React from "react";
import {Col, Row} from "antd";
import BookCard from "./bookCard";
import * as bookService from "../services/bookService"

class Bookshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
    }
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState({
        books : data,
      })
    }
    bookService.getAllBooks(callback);
  }

  render() {
    const books = this.state.books;
    let elements = [];
    if (books.length === 0) {
      elements.push(
        <Col><h2>No Data</h2></Col>
      )
    }
    else {
      let i = 0;
      while (i < books.length) {
        elements.push(<Col span={6}><BookCard book={books.at(i)} /></Col>)
        i += 1;
      }
    }
    return(
      <div>
        <Row gutter={20}>
          {elements}
        </Row>
      </div>
    );
  }
}

export default Bookshelf;