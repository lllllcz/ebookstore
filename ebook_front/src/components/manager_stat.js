import React from "react";
import * as statisticService from "../services/statisticService";
import {Button, DatePicker, Table} from "antd";

const columns1 = [
  {
    title: '书名',
    dataIndex: 'bookName',
    sortDirections: ['descend'],
  },
  {
    title: '销量',
    dataIndex: 'sales',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.sales - b.sales,
  },
];
const columns2 = [
  {
    title: '用户名',
    dataIndex: 'username',
    sortDirections: ['descend'],
  },
  {
    title: '消费',
    dataIndex: 'sales',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.sales - b.sales,
  },
];
const columns3 = [
  {
    title: '购书总数',
    dataIndex: 'total',
  },
  {
    title: '总消费',
    dataIndex: 'price',
  },
];
const tableData = [
  {
    key: '1',
    bookName: 'John Brown',
    sales: 32,
  },
  {
    key: '2',
    bookName: 'Jim Green',
    sales: 42,
  },
];


class StatInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBook: true,
      startDate: '',
      endDate: '',
      sales: [],
      price: 0,
    }
  }

  handleStartDateChange = (date, dateString) => {
    // console.log(dateString);
    this.setState({startDate: dateString});
  }
  handleEndDateChange = (date, dateString) => {
    // console.log(dateString);
    this.setState({endDate: dateString});
  }

  handleSearch = () => {
    const callback1 = (data) => {
      console.log(data);
      this.setState({sales:data});
    };
    const callback2 = (data) => {
      console.log(data);
      this.setState({
        sales:data.book,
        price:data.price,
      })
    }
    const requestData = {
      username: this.props.username,
      start: this.state.startDate,
      end: this.state.endDate,
    }
    // console.log(requestData);

    if (this.props.userType === 0) {
      statisticService.getUserStat(requestData, callback2);
    }
    else if (this.state.showBook) {
      statisticService.getBookSales(requestData, callback1);
    }
    else {
      statisticService.getUserSales(requestData, callback1);
    }
  }

  render() {
    let table;
    let hide = {};
    if (this.props.userType === 1) {
      const col = (this.state.showBook) ? columns1 : columns2;
      table = (<Table bordered columns={col} dataSource={this.state.sales} pagination={false}/>)
    }
    else {
      hide = {display:'none'};
      let totalNum = 0;
      let data = this.state.sales;
      data.forEach((book) => {
        totalNum += book.sales;
      })
      // console.log(totalNum);
      const summary = [{
        key: '1',
        total: totalNum,
        price: this.state.price,
      }]
      table = (
        <>
          <Table columns={columns1} dataSource={this.state.sales} pagination={false} bordered />
          <Table columns={columns3} dataSource={summary} pagination={false} bordered />
        </>
      )
    }

    return (
      <div
        className='Container'
        style={{
          background:'rgba(255, 255, 255, 0.8)',
          padding: '25px',
          marginTop: '20px',
        }}
      >
        <Button style={hide} onClick={this.handleShowBook} >查询书籍销量</Button>
        <Button style={hide} onClick={this.handleShowUser} >查询用户消费</Button>
        <div className="search-sales">
          <DatePicker onChange={this.handleStartDateChange} placeholder='起始日期' />
          <DatePicker onChange={this.handleEndDateChange} placeholder='终止日期' />
          <Button onClick={this.handleSearch} >查询</Button>
        </div>
        {table}
      </div>
    );
  }

  handleShowBook = () => {
    this.setState({showBook: true});
  }

  handleShowUser = () => {
    this.setState({showBook: false});
  }
}

export default StatInfo;
