import React from "react";

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(event) {
    this.props.onFilterTextChange(event.target.value);
  }

  sub(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
        <h6>搜 索 栏</h6>
        <form onSubmit={this.sub}>
          <label>
            <input
              id="inp"
              type="text"
              placeholder="在这里输入"
              value={this.props.filterText}
              onChange={this.handleFilterTextChange}
            />
          </label>
          <input type="submit" value="搜 索" />
        </form>
      </div>
    );
  }
}