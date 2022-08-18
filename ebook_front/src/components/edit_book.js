import React from "react";
import * as managerService from "../services/managerService";
import {Button, Input} from "antd";
import NumFormat from "../utils/numFormat";

class BookEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      author: "",
      bookName: "",
      bookPrice: "",
      inventory: 0,
      isbn: "",
      des: '',
    }
  }

  componentDidMount() {
    this.setState({
      author: this.props.book.author,
      bookName: this.props.book.bookName,
      bookPrice: this.props.book.bookPrice,
      inventory: this.props.book.inventory,
      isbn: this.props.book.isbn,
      des: this.props.book.bookDescription
    })
  }

  handleAuthorChange = (e) => {
    this.setState({author: e.target.value});
  }
  handleNameChange = (e) => {
    this.setState({bookName: e.target.value});
  }
  handlePriceChange = (e) => {
    this.setState({bookPrice: e.target.value});
  }
  handleInventoryChange = (e) => {
    this.setState({inventory: e.target.value});
  }
  handleISBNChange = (e) => {
    this.setState({isbn: e.target.value});
  }
  handelDesChange = (e) => {
    this.setState({des: e.target.value});
  }

  handleSubmitChange = () => {
    const bookInfo = {
      id: this.props.book.bookId,
      author: this.state.author,
      bookName: this.state.bookName,
      bookPrice: this.state.bookPrice,
      inventory: this.state.inventory,
      isbn: this.state.isbn,
      des: this.state.des,
    }
    console.log(bookInfo);
    const callback = (data) => {
      console.log(data);
    }
    managerService.setBook(bookInfo, callback);
    window.location.reload();
  }

  handleDeleteBook = () => {
    const callback = (data) => {
      console.log(data);
    }
    managerService.deleteBook(this.props.book.bookId);
    window.location.reload();
  }


  render() {
    const book = this.props.book;
    const price = NumFormat(book.bookPrice);
    return(
      <div className="manage-container">

        <div>
          <p className="left-column">作者</p>
          <p className='right-column'>{book.author}</p>
          <Input className='right-column' onChange={this.handleAuthorChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">书名</p>
          <p className='right-column'>{book.bookName}</p>
          <Input className='right-column' onChange={this.handleNameChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">价格（￥）</p>
          <p className='right-column'>{price}</p>
          <Input className='right-column' onChange={this.handlePriceChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">库存</p>
          <p className='right-column'>{book.inventory}</p>
          <Input className='right-column' onChange={this.handleInventoryChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">ISBN</p>
          <p className='right-column'>{book.isbn}</p>
          <Input className='right-column' onChange={this.handleISBNChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">书籍描述</p>
          <p className='right-column'>{book.bookDescription}</p>
          <Input className='right-column' onChange={this.handelDesChange} />
          <div className='clearfix' > </div>
        </div>

        <Button onClick={this.handleSubmitChange} >提交</Button>
        <Button onClick={this.handleDeleteBook} >删除</Button>
      </div>
    )
  }

}

class AddBook extends React.Component {
  constructor() {
    super();
    this.state = {
      author: "",
      bookName: "",
      bookPrice: "",
      inventory: 0,
      isbn: "",
      des: '',
    }
  }

  handleAuthorChange = (e) => {
    this.setState({author: e.target.value});
  }
  handleNameChange = (e) => {
    this.setState({bookName: e.target.value});
  }
  handlePriceChange = (e) => {
    this.setState({bookPrice: e.target.value});
  }
  handleInventoryChange = (e) => {
    this.setState({inventory: e.target.value});
  }
  handleISBNChange = (e) => {
    this.setState({isbn: e.target.value});
  }
  handelDesChange = (e) => {
    this.setState({des: e.target.value});
  }

  handleSubmitChange = () => {
    const bookInfo = {
      author: this.state.author,
      bookName: this.state.bookName,
      bookPrice: this.state.bookPrice,
      inventory: this.state.inventory,
      isbn: this.state.isbn,
      des: this.state.des,
    }
    console.log(bookInfo);
    const callback = (data) => {
      console.log(data);
    }
    managerService.addBook(bookInfo, callback);
    window.location.reload();
  }


  render() {
    return(
      <div className="manage-container">

        <div>
          <p className="left-column">作者</p>
          <Input className='right-column' onChange={this.handleAuthorChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">书名</p>
          <Input className='right-column' onChange={this.handleNameChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">价格（￥）</p>
          <Input className='right-column' onChange={this.handlePriceChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">库存</p>
          <Input className='right-column' onChange={this.handleInventoryChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">ISBN</p>
          <Input className='right-column' onChange={this.handleISBNChange} />
          <div className="clearfix"> </div>
        </div>

        <div>
          <p className="left-column">书籍描述</p>
          <Input className='right-column' onChange={this.handelDesChange} />
          <div className='clearfix' > </div>
        </div>

        <Button onClick={this.handleSubmitChange} >提交</Button>
      </div>
    )
  }

}

export {BookEdit, AddBook};
