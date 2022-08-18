import React from "react";
import WebTop from "../components/web_top";
import OrderInfo from "../components/order_info";
import {withRouter} from "react-router-dom";

class Orders extends React.Component {
    render() {
        return(
            <div className="Cart">
                <WebTop user={this.props.userName} userType={this.props.userType} />
                <OrderInfo userId={this.props.userId} userType={this.props.userType} />
            </div>
        );
    }
}

export default withRouter(Orders);