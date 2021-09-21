import { useState, useEffect } from "react";
import { carouselData } from '../data/data.json'; // use useEffect for retrieving data from a REST API
import { CarouselData } from '../models/APIModels';
import useCurrency from 'currency-symbol-map';
import { useViewport, Width } from "../services/useViewport";
import { Button, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Color } from '../utilities/Color';

interface ItemDisplayState {
  displayQuantity: number,
  pageCount: number,
  firstItem: number,
  lastItem: number,
}
export function RelatedProducts() {

  const [showMore, setShowMore] = useState<boolean>(false);
  const { width } = useViewport();

  const [resultDisplay, setResultDisplay] = useState<ItemDisplayState>({
    displayQuantity: 0,
    firstItem: 0,
    lastItem: 0,
    pageCount: 1,
  });
  const { firstItem, lastItem, displayQuantity, pageCount } = resultDisplay;

  const resetSelectionState = () => {
    setResultDisplay(resultDisplay => ({ ...resultDisplay, firstItem: 0, pageCount: 1 }));

    switch (true) {
      case width <= Width.Phone:
        setResultDisplay({ firstItem: 0, lastItem: 1,  pageCount: 1, displayQuantity: 1 });
        break;
      case width <= Width.SmallTablet:
        setResultDisplay({ firstItem: 0, lastItem: 2,  pageCount: 1, displayQuantity: 2 });
        break;
      case width <= Width.LargeTablet:
        setResultDisplay({ firstItem: 0, lastItem: 3,  pageCount: 1, displayQuantity: 3 });
        break;
      default:
        setResultDisplay({ firstItem: 0, lastItem: 4,  pageCount: 1, displayQuantity: 4 });
    }
  };

  useEffect(resetSelectionState, [width]);

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
        <section className="products-list" style={ { gridTemplateColumns: `repeat(${ displayQuantity }, 1fr`} }>
          { carouselData
            //Remove display if !data.showCarouselItemHead
            .filter(data => data.showCarouselItemHead)
            .slice(firstItem, lastItem)
            //Sort based on data.itemPositionOneBased in chronological order
            .sort((a, b) => a.itemPositionOneBased - b.itemPositionOneBased)
            .map(data =>
              <Product data={ data } showMore={ showMore } key={ data.code } />) }
          <IconButton className="control left" aria-label="left-icon" icon={ <ChevronLeftIcon w={7} h={7} /> }
                      disabled={ firstItem <= 0 }
                      onClick={ () => setResultDisplay({
                        ...resultDisplay,
                        firstItem: firstItem - displayQuantity,
                        lastItem: lastItem - displayQuantity,
                        pageCount: pageCount - 1
                      }) } />
          <IconButton className="control right" aria-label="right-icon" icon={ <ChevronRightIcon w={7} h={7} /> }
                      disabled={ lastItem >= carouselData.length }
                      onClick={ () => setResultDisplay({
                        ...resultDisplay,
                        firstItem: firstItem + displayQuantity,
                        lastItem: lastItem + displayQuantity,
                        pageCount: pageCount + 1
                      }) } />
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
             onClick={ () => window.open(url, '_blank') }>
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