import React from 'react';
import { RelatedProducts } from "./components/RelatedProducts";
import './assets/scss/App.scss';
import { ChakraProvider } from "@chakra-ui/react";

function App() {

  return (
    <section className="display-component">
      <ChakraProvider>
        <RelatedProducts />
      </ChakraProvider>
    </section>
  );
}

export default App;
