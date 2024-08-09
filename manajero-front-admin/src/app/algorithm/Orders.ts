import {Product} from '../products/product';

export interface Orders {
  orderId?: string;
  orderName: string;
  quantity: number;
  product?: Product;

}
