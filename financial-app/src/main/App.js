import React from "react";

import ProviderAuthentication from "./providerAuthentication";

import Rotas from "../main/rotas";
import NavBar from "../components/navbar";

import "toastr/build/toastr.min.js";

import "bootswatch/dist/flatly/bootstrap.css";
import "./../styles/custom.css";
import "toastr/build/toastr.css";

import 'primereact/resources/themes/nova-accent/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
 

class App extends React.Component {
  render() {
    return (
      <ProviderAuthentication>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </ProviderAuthentication>
    );
  }
}

export default App;
