import React from "react";
import Web_top from "../components/web_top";
import {withRouter} from "react-router-dom";
import StatInfo from "../components/manager_stat";


class StatisticPage extends React.Component {

  render() {
    return (
      <div>
        <Web_top user={this.props.userName} userType={this.props.userType} />
        <StatInfo userType={this.props.userType} username={this.props.userName} />
      </div>
    );
  }

}

export default withRouter(StatisticPage);