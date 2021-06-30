import { useState, useEffect } from "react";
import { carouselData } from '../data/data.json'; // use useEffect for retrieving data from a REST API
import { CarouselData } from '../models/APIModels';
import useCurrency from 'currency-symbol-map';
import { useViewport, Width } from "../services/useViewport";
import { Button, IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Color } from '../utilities/Color';

export function RelatedProducts() {

  const [showMore, setShowMore] = useState<boolean>(false);
  const { width } = useViewport();
  const [productDisplayQuantity, setProductDisplayQuantity] = useState<number>();
  const pageAmount = productDisplayQuantity && Math.ceil(carouselData.length / productDisplayQuantity);
  const [pageCount, setPageCount] = useState(1);
  const [firstItem, setFirstItem] = useState(0);
  const [lastItem, setLastItem] =  useState<number>();

  useEffect(() => {
    //If width changes, reset the firstItem in display to be 0, then check lastItem based on width.
    setFirstItem(0);
    setPageCount(1);

    if (width < Width.Phone) {
      setProductDisplayQuantity(1);
      setLastItem(1);
    } else if (width < Width.SmallTablet) {
      setProductDisplayQuantity(2);
      setLastItem(2);
    } else if (width < Width.LargeTablet) {
      setProductDisplayQuantity(3);
      setLastItem(3);
    } else {
      setProductDisplayQuantity(4);
      setLastItem(4);
    }
  }, [width]);

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
        <section className="products-list" style={ { gridTemplateColumns: `repeat(${ productDisplayQuantity }, 1fr`} }>
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
                      onClick={ () => {
                        if (productDisplayQuantity && lastItem) {
                          setFirstItem(firstItem - productDisplayQuantity);
                          setLastItem(lastItem - productDisplayQuantity);
                          setPageCount(pageCount - 1);
                        }
                      } } />
          <IconButton className="control right" aria-label="right-icon" icon={ <ChevronRightIcon w={7} h={7} /> }
                      disabled={ pageAmount ? pageCount >= pageAmount : undefined }
                      onClick={ () => {
                        if (productDisplayQuantity && lastItem) {
                          setFirstItem(firstItem + productDisplayQuantity);
                          setLastItem(lastItem + productDisplayQuantity);
                          setPageCount(pageCount + 1);
                        }
                      } } />
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
    <section className={ showMore ? "product flasher" : "product flasher collapsed-product"}
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