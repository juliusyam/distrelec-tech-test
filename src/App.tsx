import React from 'react';
import { RelatedProducts } from "./components/RelatedProducts";
import './assets/scss/App.scss';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <section className="display-component">
        <ChakraProvider>
          <Switch>
            <Route exact={true} component={ RelatedProducts } path='/' />
          </Switch>
        </ChakraProvider>
      </section>
    </BrowserRouter>
  );
}

export default App;
