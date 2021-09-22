import React from 'react';
import { RelatedProducts } from "./components/RelatedProducts";
import './assets/scss/App.scss';
import { ChakraProvider } from "@chakra-ui/react";
import {HashRouter, Route, Switch} from "react-router-dom";

function App() {

  return (
    <HashRouter>
      <section className="display-component">
        <ChakraProvider>
          <Switch>
            <Route exact={true} component={ RelatedProducts } path='/' />
          </Switch>
        </ChakraProvider>
      </section>
    </HashRouter>
  );
}

export default App;
