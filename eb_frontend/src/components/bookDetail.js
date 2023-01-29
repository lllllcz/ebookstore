import React from "react";
import {Anchor, Breadcrumb, Button, Col, Divider, Image, InputNumber, Layout, message, Row} from "antd";
import * as bookService from "../services/bookService"
import {BookOutlined, CheckCircleOutlined, HomeOutlined, PayCircleFilled} from "@ant-design/icons";
import priceFormat from "../utils/priceFormat";
import {fallbackImage} from "../assets/fallbackImage";

import * as orderService from "../services/orderService"

const { Content } = Layout;

function BookInfoRightArea(props) {
  return(
    <div>
      <p
        style={{
          fontSize:32,
          textAlign:'center',
        }}
      >
        {props.name}
      </p>
      <p
        style={{
          fontSize:20,
          fontFamily:'楷体',
          marginBottom:32,
        }}
      >
        作者：{props.author}
        <br/>
        <br/>
        库存：{props.inv} 本
      </p>
      <p>
        ISBN：{props.isbn}
      </p>
      <p
        style={{
          fontSize:25,
          paddingLeft:25,
          margin:'40px 0',
          color:'darkblue'
        }}
      >
        <PayCircleFilled /> {priceFormat(props.price)}
      </p>
    </div>
  );
}

class BookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book : {},
      num : 1,
    }
  }

  componentDidMount() {
    const callback = (data) => {
      this.setState({
        book : data,
      })
    }
    bookService.getBook(this.props.id, callback);
  }

  handleNumChange = (val) => {
    // console.log(val);
    this.setState({
      num : val,
    })
  }

  addCart = () => {
    const bid = this.state.book.bookId;
    // eslint-disable-next-line
    const user = eval('(' + localStorage.getItem("user") + ')');
    const callback = (data) => {
      console.log(data);
      message.success(data.msg);
    }
    orderService.setBookToCart(user.userId, bid, callback);
  }

  addOneBookOrder = () => {
    const bid = this.state.book.bookId;
    // eslint-disable-next-line
    const user = eval('(' + localStorage.getItem("user") + ')');
    const callback = (data) => {
      console.log(data);
      message.success(data.msg);
    }
    orderService.setBookToOrder(user.userId, bid, this.state.num, callback);
  }

  render() {
    const book = this.state.book;
    return(
      <Content className="l-content" >
        <Breadcrumb className="l-breadcrumb" >
          <Breadcrumb.Item><HomeOutlined /> Home</Breadcrumb.Item>
          <Breadcrumb.Item><BookOutlined /> Book</Breadcrumb.Item>
          <Breadcrumb.Item>{book.bookName}</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Row>
            <Col
              span={22}
              style={{backgroundColor:'rgb(252, 252, 252)', padding:20, borderRadius:20}}
            >
              <Row id="part-1">
                <Col span={12} style={{paddingRight:100}}>
                  <Image
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    fallback={fallbackImage}
                  />
                </Col>
                <Col span={12} >
                  <BookInfoRightArea
                    name={book.bookName}
                    author={book.author}
                    inv={book.inventory}
                    isbn={book.isbn}
                    price={book.bookPrice}
                  />
                  <div style={{textAlign:"center", marginBottom:50}}>
                    <Button
                      type="dashed"
                      shape="round"
                      size="large"
                      onClick={this.addCart}
                    >
                      加入购物车
                    </Button>
                  </div>
                  <Row>
                    <Col span={12} style={{fontFamily:"黑体", paddingLeft:50,}}>
                      购买数量：<InputNumber min={1} max={10} defaultValue={1} onChange={this.handleNumChange} />
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        icon={<CheckCircleOutlined />}
                        size="large"
                        style={{fontFamily:"幼圆"}}
                        onClick={this.addOneBookOrder}
                      >
                        立即购买
                      </Button>
                    </Col>
                  </Row>

                </Col>

              </Row>

              <br/><br/>

              <Divider />

              <div id="part-2" style={{minHeight:500}}>
                {book.bookDescription}
              </div>
            </Col>
            <Col span={2}>
              <Anchor
                items={[
                  {
                    key: 'part-1',
                    href: '#part-1',
                    title: '购买',
                  },
                  {
                    key: 'part-2',
                    href: '#part-2',
                    title: '商品介绍',
                  },
                ]}
                style={{paddingTop:100}}
              />
            </Col>
          </Row>
        </div>
      </Content>
    );
  }
}

export default BookDetail;