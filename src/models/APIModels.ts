export interface FullData {
  numberOfItems: string,
  carouselData: CarouselData[],
}

export interface CarouselData {
  code: string,
  erpCode: string,
  typeName: string,
  name: string,
  url: string,
  promotiontext: string, //This should be camel case
  energyEfficiencyData: string,
  productImageAltText: string,
  productImageUrl: string,
  itemPositionOneBased: number, //item 1 is type string, so i modified it to number
  originalPackSize: string,
  salesUnit: string,
  showCarouselItemHead: boolean,
  distManufacturer: DistManufacturer,
  promoLabelCompensateClass: string,
  activePromotionLabels: ActivePromotionLabel[],
  price: Price,
  categories: string,
}

export interface DistManufacturer {
  name: string,
  brand_logo: BrandLogo
}

export interface BrandLogo {
  url: string,
}

export interface Price {
  currency: string,
  formattedValue: string,
}

export interface ActivePromotionLabel {
  code: string,
  label: string,
}