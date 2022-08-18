import WebTop from "../components/web_top";
import {withRouter} from "react-router-dom";
import React from "react";

import "../css/manage_book.css"

import * as managerService from "../services/managerService"
import SearchBar from "../components/search_bar";
import {Button} from "antd";
import {AddBook, BookEdit} from "../components/edit_book";


class ManageBook extends React.Component {
  constructor() {
    super();
    this.state = {
      filterText: '',
      books: [],
      add: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState({books: data});
      // console.log(data);
    }
    managerService.getBooks({search:""}, callback);
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  handleShowAdd = () => {
      this.setState({add: !this.state.add});
  }

  render() {
    let elements = [];
    let books = [];
    if (this.state.filterText !== '') {
      // 进行搜索
      this.state.books.forEach((book) => {
        if (book.bookName.indexOf(this.state.filterText) === -1) {
          return;
        }
        books.push(book);
      })
    } else {
      // 未进行搜索
      books = this.state.books;
    }

    books.forEach((book) => {
      elements.push(
        <BookEdit book={book} />
      )
    })

    const addElement = (this.state.add)? (<AddBook />) : null;

    return(
      <div className="MBPage">
        <WebTop user={this.props.userName} userType={this.props.userType} />
        <div className="Container">
          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />
        </div>
        <div className="Container" style={{paddingBottom:'100px'}}>
          {elements}
          <Button onClick={this.handleShowAdd}>添加新书</Button>
          {addElement}
        </div>
      </div>
    );
  }

}

export default withRouter(ManageBook);