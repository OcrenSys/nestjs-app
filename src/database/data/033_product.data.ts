import { Product } from '../models/product.entity';
import { BrandData } from './009_brand.data';

export const ProductData: Product[] = [
  {
    description: 'Wireless Gaming Mouse',
    assin: 'ASDFGHJKL',
    link: 'https://www.amazon.com/Logitech-LIGHTSPEED-programmable-connectivity-hyper-fast/dp/B07QN369XX/ref=sr_1_4?keywords=gaming+mouse+FIODIO&qid=1669392965&sr=8-4',
    weight: 1,
    dimensions: "4' x 3' x 2'",
    cost: 10,
    storePrice: 20,
    officePrice: 18,
    isActive: true,
    brand: BrandData[0],
  },

  {
    description: 'Wireless Touch TV Keyboard',
    assin: 'ASDFGHJKL',
    link: 'https://www.amazon.com/Logitech-Wireless-Keyboard-Touchpad-PC-connected/dp/B014EUQOGK?ref_=ast_sto_dp',
    weight: 1,
    dimensions: "4' x 3' x 2'",
    cost: 10,
    storePrice: 20,
    officePrice: 18,
    isActive: true,
    brand: BrandData[1],
  },

  {
    description: 'Headphones with Noise Canceling Microphone',
    assin: 'ASDFGHJKL',
    link: 'https://www.amazon.com/Logitech-LIGHTSPEED-programmable-connectivity-hyper-fast/dp/B07QN369XX/ref=sr_1_4?keywords=gaming+mouse+FIODIO&qid=1669392965&sr=8-4',
    weight: 1,
    dimensions: "4' x 3' x 2'",
    cost: 10,
    storePrice: 20,
    officePrice: 18,
    isActive: true,
    brand: BrandData[2],
  },
];
