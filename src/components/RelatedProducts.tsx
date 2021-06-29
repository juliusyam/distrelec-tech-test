import { useState } from "react";
import { carouselData } from '../data/data.json'; // use useEffect for retrieving data from a REST API
import { CarouselData } from '../models/APIModels';
import useCurrency from 'currency-symbol-map';
import { Button } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Color } from '../utilities/Color';

export function RelatedProducts() {

  const [showMore, setShowMore] = useState<boolean>(false);


  return (
    <section className="related-products">
      <div className="top-bar">
        <h1>Related Products</h1>
        <Button colorScheme="red"
                variant={ showMore ? 'outline' : 'solid' }
                leftIcon={ showMore ? <ViewOffIcon /> : <ViewIcon /> }
                onClick={ () => setShowMore(!showMore) }
                _focus={{ boxShadow: `0 0 0 3px ${ Color.Red_100 }` }}
        >
          { showMore ? 'Collapse' : 'Show More' }
        </Button>
      </div>
      { showMore ?
        <section className="products-list">
          { carouselData
            //Remove display if !data.showCarouselItemHead
            .filter(data => data.showCarouselItemHead)
            //Sort based on data.itemPositionOneBased in chronological order
            .sort((a, b) => a.itemPositionOneBased - b.itemPositionOneBased)
            .map(data =>
              <Product data={ data } showMore={ showMore } key={ data.code } />) }
        </section> :
        <section className="products-list collapsed-product-list">
          { carouselData
            //Remove display if !data.showCarouselItemHead
            .filter(data => data.showCarouselItemHead)
            .slice(0, 5)
            //Sort based on data.itemPositionOneBased in chronological order
            .sort((a, b) => a.itemPositionOneBased - b.itemPositionOneBased)
            .map(data =>
              <Product data={ data } showMore={ showMore }  key={ data.code } />) }
        </section>
      }
      </section>
  )
}

interface ProductProps {
  data: CarouselData,
  showMore: boolean,
}

function Product({ data, showMore }: ProductProps) {

  const price = data.price;
  const url = data.url;

  return (
    <section className={ showMore ? "product" : "product collapsed-product"}
             onClick={ () => window.location.href= url }>
        <div className="cube cube-1" />
        <div className="cube cube-2" />
        <div className="details">
          <div className="img-container">
            <img src={ data.productImageUrl } alt={ data.productImageAltText } />
          </div>
          <div className="description">
            <h3>{ data.name }</h3>
            <h3 className="price">
              { useCurrency(price.currency) }{' '}{ price.formattedValue }{' '}
              <span>/ { data.salesUnit }</span>
            </h3>
          </div>
        </div>
    </section>
  )
}