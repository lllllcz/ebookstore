import WebTop from "../components/web_top";
import ViewBooks from "../components/view_books";
import {withRouter} from "react-router-dom";
import React from "react";


class MainPage extends React.Component {
    render() {
        return (
            <div className="MainPage">
                <WebTop user={this.props.userName} userType={this.props.userType} />
                <ViewBooks />
            </div>
        )
    }
}

export default withRouter(MainPage);