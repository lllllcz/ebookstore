import React from "react";
import '../css/login.css'
import {withRouter} from "react-router-dom";
import * as userService from "../services/userService";

function checkRepeat(e) {
  e.preventDefault();
  const username = document.getElementById("nam").value;
  const password = document.getElementById("pas").value;
  const repeatPas = document.getElementById("rpas").value;
  const email = document.getElementById("email").value;
  if (username === "" || password === "" || repeatPas === "" || email === '') {
    window.alert("empty");
    return false;
  }
  if (password !== repeatPas) {
    window.alert("not same");
    return false;
  }

  const data = {
    username: username,
    password: password,
  }
  console.log(data);
  userService.signup(data);

  return true;
}

class Signup extends React.Component {
  render() {
    return(
      <div className="Login">
        <h1>Sign Up Now !</h1>
        <div className="container">

          <h2>Sign Up</h2>

          <form action="#" method="post" onSubmit={checkRepeat}>
            <div className="input-group">
              <label>
                <input type="text" placeholder="Username" required="" id="nam" />
              </label>
            </div>
            <div className="input-group">
              <label>
                <input type="Password" placeholder="Password" required="" id="pas" />
              </label>
            </div>
            <div className="input-group">
              <label>
                <input type="Password" placeholder="Repeat Password" required="" id="rpas" />
              </label>
            </div>
            <div className="input-group">
              <label>
                <input type="email" placeholder="Email" required="" id='email'/>
              </label>
            </div>
            <button className="btn" type="submit">Sign Up</button>
          </form>

        </div>
      </div>
    );
  }
}

export default withRouter(Signup);