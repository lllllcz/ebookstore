import React from "react";
import '../css/view_books.css'
import {Link} from "react-router-dom";
import {getBooks} from "../services/bookService";
import SearchBar from "./search_bar";
import NumFormat from "../utils/numFormat";
import {Button} from "antd";

class BookItem extends React.Component {
  render() {
    const reqJPGs = require.context('../assets/', true, /\.jpg$/);
    const JPGPaths = reqJPGs.keys();
    const index = (this.props.book.bookId <= 4) ? (this.props.book.bookId - 1) : 0;
    const imagePath = JPGPaths[index];
    const image = reqJPGs(imagePath);
    const element = (<img className="BookItem-pictures" src={image} alt=""/>);

    let name = this.props.book.bookName;
    if (name.length >= 12) {
      name = name.substring(0, 10) + " ...";
    }
    // console.log(name);

    const price = NumFormat(this.props.book.bookPrice);

    return (
      <div className="BookItem">
        <Link to={{pathname: '/detail', search: '?id='+this.props.book.bookId}} >
          {element}
          <p className="BookItem-name">{name}</p>
          <p className="BookItem-price">￥{price}</p>
          <p className="BookItem-storge">库存：{this.props.book.inventory}</p>
        </Link>
      </div>
    );
  }
}

const bookData = {
  bookId: 1,
  bookName: "name",
  bookPrice: 10,
  inventory: 99
}

const pageSize = 8;

class ViewBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      books:[],
      page: 0,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  componentDidMount() {

    const callback =  (data) => {
      this.setState({books:data});
      console.log(this.state.books);
    };

    getBooks({"search":null}, callback);
  }

  handleFilterTextChange(filterText) {
    this.setState({filterText: filterText});
  }

  render() {
    const elements = [];
    const rest = [];
    let items = [];
    const text = this.state.filterText;

    // filter
    if (this.state.filterText !== '') {
      // 进行搜索
      this.state.books.forEach((book) => {
        if (book.bookName.indexOf(text) === -1) {
          return;
        }
        items.push(book);
      });
    } else {
      // 未进行搜索
      items = this.state.books;
    }

    // 生成展示列表
    const step = this.state.page * pageSize;
    let l = step;
    while (items.length - l >= 4) {
      elements.push(
        <div className="ShelfLevel">
          <BookItem book={items.at(l)}/>
          <BookItem book={items.at(l + 1)}/>
          <BookItem book={items.at(l + 2)}/>
          <BookItem book={items.at(l + 3)}/>
        </div>
      );
      l += 4;
      if (l >= pageSize+step) {
        break;
      }
    }
    if (l < pageSize+step) {
      while (l < items.length) {
        rest.push(
          <BookItem book={items.at(l)}/>
        );
        l += 1;
      }
      elements.push(
        <div className="ShelfLevel">
          {rest}
        </div>
      );
    }


    return (
      <div className="ViewBooks">
        <div className="ToolBar">
          <div className="Container">
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
          </div>
        </div>
        <div className="Bookshelf">
          <div className="Container" style={{paddingBottom:'100px'}}>
            <h1 className="ShelfName">图书信息</h1>
            <p style={{fontSize:'18px'}}>共计{items.length}本，当前第{this.state.page+1}页</p>
            {elements}
            <Button style={{float:'right'}} onClick={this.handleNextPage} >下一页</Button>
            <Button style={{float:'right'}} onClick={this.handlePrePage} >上一页</Button>
          </div>
        </div>
      </div>
    );
  }

  handlePrePage = () => {
    if (this.state.page > 0) {
      this.setState({page: this.state.page - 1});
    }
  }
  handleNextPage = () => {
    const max = parseInt(this.state.books.length / pageSize);
    if (this.state.page < max) {
      this.setState({page: this.state.page + 1});
    }
  }

}

export default ViewBooks;