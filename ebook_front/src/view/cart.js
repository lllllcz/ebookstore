import React from "react";
import WebTop from "../components/web_top";
import CartInfo from "../components/cart_info";
import {withRouter} from "react-router-dom";

class Cart extends React.Component {
    render() {
        return(
            <div className="Cart">
                <WebTop user={this.props.userName} userType={this.props.userType} />
                <CartInfo userId={this.props.userId} />
            </div>
        );
    }
}

export default withRouter(Cart);