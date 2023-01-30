import React from "react";
import {Col, Row, Input} from "antd";
import BookCard from "./bookCard";
import * as bookService from "../services/bookService"

const {Search} = Input;

class Bookshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      searchResult : [],
    }
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState({
        books : data,
      })
    };
    bookService.getAllBooks(callback);
  }

  handleSearch = (val) => {
    const callback = (data) => {
      console.log(data);
      this.setState({
        searchResult : data.data,
      })
    }
    bookService.searchBookName(val, callback);
  }


  render() {
    const books = this.state.books;
    const filter = this.state.searchResult;
    let elements = [];
    if (books.length === 0) {
      elements.push(
        <Col><h2>No Data</h2></Col>
      )
    }
    else if (filter.length === 0) {
      let i = 0;
      while (i < books.length) {
        elements.push(<Col span={6}><BookCard book={books.at(i)} /></Col>)
        i += 1;
      }
    }
    else {
      let i = 0;
      while (i < books.length) {
        let j = 0;
        let flag = false;
        while (j < filter.length) {
          if (filter.at(j) === (i+1).toString()) {
            flag = true;
          }
          j += 1;
        }
        if (flag) {
          elements.push(<Col span={6}><BookCard book={books.at(i)} /></Col>)
        }
        i += 1;
      }
    }

    return(
      <div>
        <Search
          style={{padding:40, marginBottom:20,}}
          placeholder="输入书名"
          onSearch={this.handleSearch}
          enterButton
        />
        <Row gutter={20}>
          {elements}
        </Row>
      </div>
    );
  }
}

export default Bookshelf;