import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import RNet from "./rnet/RNet";

RNet.createInstance("127.0.0.1", 3002);

ReactDOM.render(<App />, document.getElementById("root"));
